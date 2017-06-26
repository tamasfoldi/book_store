import { State, initialState, reducer } from './search.reducer';
import { Action } from '@ngrx/store';
import * as books from '../actions/books.actions';
import * as testData from '../../test-datas';

describe('SearchReducer', () => {
  describe('undefined action', () => {
    it('should return the state', () => {
      const result = reducer(initialState, {} as books.Actions);

      expect(result).toEqual(initialState);
    });
  });

  describe('SEARCH', () => {
    it('should set the query and isLoading to true', () => {
      const expectedResult: State = {
        ...initialState,
        query: 'test',
        isLoading: true,
      };
      const result = reducer(initialState, new books.SearchAction('test'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('SEARCH_SUCCESS', () => {
    it('should set the ids from the payload and isLoading to false', () => {
      const expectedResult: State = {
        ...initialState,
        isLoading: false,
        ids: [testData.TEST_BOOK.id]
      };
      const result = reducer(initialState, new books.SearchSuccessAction([testData.TEST_BOOK]));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('SEARCH_FAIL', () => {
    it('should set isLoading to false', () => {
      const expectedResult: State = {
        ...initialState,
        isLoading: false,
      };
      const result = reducer(initialState, new books.SearchFailAction('error'));

      expect(result).toEqual(expectedResult);
    });
  });

});
