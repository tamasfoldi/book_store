import * as books from '../actions/books.actions';

export interface State {
  ids: string[];
  isLoading: boolean;
  query: string;
};

export const initialState: State = {
  ids: [],
  isLoading: false,
  query: ''
};

export function reducer(state = initialState, action: books.Actions): State {
  switch (action.type) {
    case books.SEARCH: {
      const query = action.payload;
      if (query.length === 0) {
        return {
          ids: [],
          isLoading: false,
          query
        };
      }
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

export const ids = (state: State) => state.ids;
export const isLoading = (state: State) => state.isLoading;
export const query = (state: State) => state.query;
