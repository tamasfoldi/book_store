import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as fromBooks from './books.reducer';
import * as fromCart from './cart.reducer';
import * as fromSearch from './search.reducer';

export interface State {
  books: fromBooks.State;
  cart: fromCart.State;
  search: fromSearch.State;
}

const reducers = {
  books: fromBooks.reducer,
  cart: fromCart.reducer,
  search: fromSearch.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
