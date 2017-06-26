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

export const getBooksState = (state: State) => state.books;
export const getBooks = createSelector(getBooksState, fromBooks.getBooks);
export const getBookIds = createSelector(getBooksState, fromBooks.getIds);
export const getSelectedBookId = createSelector(getBooksState, fromBooks.getSelectedId);
export const getSelectedBook = createSelector(getBooks, getSelectedBookId, (books, selectedId) => books[selectedId]);


export const getSearchState = (state: State) => state.search;
export const getSearchIsLoading = createSelector(getSearchState, fromSearch.isLoading);
export const getSearchBookIds = createSelector(getSearchState, fromSearch.ids);
export const getSearchQuery = createSelector(getSearchState, fromSearch.query);
export const getSearchBooks = createSelector(getBooks, getSearchBookIds, (books, searchIds) => searchIds.map(id => books[id]));

export const getCartState = (state: State) => state.cart;
export const getCartIsLoading = createSelector(getCartState, fromCart.isLoading);
export const getCartIsAdding = createSelector(getCartState, fromCart.isAdding);
export const getCartBookIds = createSelector(getCartState, fromCart.getIds);
export const getCartBooks = createSelector(getBooks, getCartBookIds, (books, cardIds) => cardIds.map(id => books[id]));
