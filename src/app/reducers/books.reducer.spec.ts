import { State, initialState, reducer } from './books.reducer';
import { Action } from '@ngrx/store';
import * as books from '../actions/books.actions';
import * as cart from '../actions/cart.actions';
import * as testData from '../../test-datas';

describe('BooksReducer', () => {
  describe('undefined action', () => {
    it('should return the state', () => {
      const result = reducer(initialState, {} as books.Actions);

      expect(result).toEqual(initialState);
    });
  });

  describe('books.LOAD_SUCCESS', () => {
    it('should set add the new book id and book', () => {
      const expectedResult = {
        ...initialState,
        ids: [testData.TEST_BOOK.id],
        books: {
          [testData.TEST_BOOK.id]: testData.TEST_BOOK
        }
      };
      const result = reducer(initialState, new books.LoadSuccessAction(testData.TEST_BOOK));

      expect(result).toEqual(expectedResult);
    });

    it('should not add if already exists', () => {
      const expectedResult = {
        ...initialState,
        ids: [testData.TEST_BOOK.id],
        books: {
          [testData.TEST_BOOK.id]: testData.TEST_BOOK
        }
      };
      const result = reducer(expectedResult, new books.LoadSuccessAction(testData.TEST_BOOK));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('cart.LOAD_SUCCESS, books.SEARCH_SUCCESS', () => {
    it('should set the received data in normalized format', () => {
      const expectedResult = {
        ...initialState,
        ids: [testData.TEST_BOOK.id],
        books: {
          [testData.TEST_BOOK.id]: testData.TEST_BOOK
        }
      };
      const booksResult = reducer(initialState, new books.SearchSuccessAction([testData.TEST_BOOK]));
      const cartResult = reducer(initialState, new cart.LoadSuccessAction([testData.TEST_BOOK]));
      expect(booksResult).toEqual(expectedResult);
      expect(booksResult).toEqual(cartResult);
    });
  });

  describe('books.SELECT', () => {
    it('should set the selectedId', () => {
      const expectedResult: State = {
        ...initialState,
        selectedId: testData.TEST_BOOK.id
      };
      const result = reducer(initialState, new books.SelectAction(testData.TEST_BOOK.id));

      expect(result).toEqual(expectedResult);
    });
  });
});
