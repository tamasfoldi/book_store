import * as cart from '../actions/cart.actions';
import { Action } from '@ngrx/store';
import * as _ from 'lodash';

export interface State {
  ids: string[];
  isLoading: boolean;
  isAdding: boolean;
}

export const initialState: State = {
  ids: [],
  isLoading: false,
  isAdding: false
};

export function reducer(state = initialState, action: cart.Actions): State {
  switch (action.type) {
    case cart.LOAD: {
      return {
        ...state,
        isLoading: true
      };
    }

    case cart.LOAD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        ids: [...action.payload.map(book => book.id)]
      };
    }

    case cart.LOAD_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    case cart.ADD: {
      return {
        ...state,
        isAdding: true
      };
    }

    case cart.ADD_SUCCESS: {
      return {
        ...state,
        ids: _.uniq([...state.ids, action.payload.id]),
        isAdding: false
      };
    }

    case cart.ADD_FAIL: {
      return {
        ...state,
        isAdding: false
      };
    }

    default: {
      return state;
    }

  }
}
