import * as books from '../actions/books.actions';
import * as cart from '../actions/cart.actions';
import { Action } from '@ngrx/store';
import { Book } from '../models/book';
import * as _ from 'lodash';

export interface State {
  ids: string[];
  books: { [id: string]: Book };
  selectedId: string;
}

export const initialState: State = {
  ids: [],
  books: {},
  selectedId: null
};

export function reducer(state = initialState, action: books.Actions | cart.Actions): State {
  switch (action.type) {
    case books.LOAD_SUCCESS: {
      const book = action.payload;

      if (state.ids.includes(book.id)) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, book.id],
        books: _.assign({}, state.books, { [book.id]: book })
      };
    }

    case cart.LOAD_SUCCESS:
    case books.SEARCH_SUCCESS: {
      const bookIds = action.payload.map(book => book.id);

      const newIds = _.difference(bookIds, state.ids);

      const newBooks = action.payload
        .reduce((books: { [id: string]: Book }, book: Book) => _.assign(books, { [book.id]: book }), state.books);

      return { ...state, books: newBooks, ids: [...state.ids, ...newIds] };
    }

    case books.SELECT: {
      return { ...state, selectedId: action.payload };
    }

    default: {
      return state;
    }

  }
}

export const getBooks = (state: State) => state.books;
export const getIds = (state: State) => state.ids;
export const getSelectedId = (state: State) => state.selectedId;
