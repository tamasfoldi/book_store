import * as books from '../actions/books.actions';

export interface State {
  ids: string[];
  isLoading: boolean;
  query: string;
};

const initialState: State = {
  ids: [],
  isLoading: false,
  query: ''
};

export function reducer(state = initialState, action: books.Actions): State {
  switch (action.type) {
    case books.SEARCH: {
      return {
        ...state,
        query: action.payload,
        isLoading: true
      };
    }

    case books.SEARCH_SUCCESS: {
      return {
        ...state,
        ids: action.payload.map(book => book.id),
        isLoading: false
      };
    }

    case books.SEARCH_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}
