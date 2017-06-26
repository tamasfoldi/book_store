import * as cart from '../actions/cart.actions';
import { Action } from '@ngrx/store';
import * as _ from 'lodash';

export interface State {
  ids: string[];
}

export const initialState: State = {
  ids: []
};

export function reducer(state = initialState, action: cart.Actions): State {
  switch (action.type) {
    case cart.ADD: {

      return {
        ...state,
        ids: _.uniq([...state.ids, action.payload]),
      };
    }

    default: {
      return state;
    }

  }
}
