import { State, initialState, reducer } from './cart.reducer';
import { Action } from '@ngrx/store';
import * as cart from '../actions/cart.actions';
import * as testData from '../../test-datas';

describe('CartReducer', () => {
  describe('undefined action', () => {
    it('should return the state', () => {
      const result = reducer(initialState, {} as cart.Actions);

      expect(result).toEqual(initialState);
    });
  });

  describe('LOAD', () => {
    it('should set isLoading to true', () => {
      const expectedResult: State = {
        ...initialState,
        isLoading: true,
      };
      const result = reducer(initialState, new cart.LoadAction());

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_SUCCESS', () => {
    it('should set isLoading to false and the ids from payload', () => {
      const expectedResult: State = {
        ...initialState,
        isLoading: false,
        ids: [testData.TEST_BOOK.id]
      };
      const result = reducer(initialState, new cart.LoadSuccessAction([testData.TEST_BOOK]));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('LOAD_FAIL', () => {
    it('should set isLoading to false', () => {
      const expectedResult: State = {
        ...initialState,
        isLoading: false,
      };
      const result = reducer(initialState, new cart.LoadFailAction('error'));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('ADD', () => {
    it('should set isAdding to true', () => {
      const expectedResult: State = {
        ...initialState,
        isAdding: true,
      };
      const result = reducer(initialState, new cart.AddAction(testData.TEST_BOOK));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('ADD_SUCCESS', () => {
    it('should set isAdding to false and add the new id', () => {
      const expectedResult: State = {
        ...initialState,
        isAdding: false,
        ids: [testData.TEST_BOOK.id]
      };
      const result = reducer(initialState, new cart.AddSuccessAction(testData.TEST_BOOK));

      expect(result).toEqual(expectedResult);
    });

    it('should set isAdding to false not add the id if exists', () => {
      const expectedResult: State = {
        ...initialState,
        isAdding: false,
        ids: [testData.TEST_BOOK.id]
      };
      const startingState = {
        ...initialState,
        ids: [testData.TEST_BOOK.id]
      };

      const result = reducer(startingState, new cart.AddSuccessAction(testData.TEST_BOOK));

      expect(result).toEqual(expectedResult);
    });
  });

  describe('ADD_FAIL', () => {
    it('should set isAdding to false', () => {
      const expectedResult: State = {
        ...initialState,
        isAdding: false,
      };
      const result = reducer(initialState, new cart.AddFailAction('error'));

      expect(result).toEqual(expectedResult);
    });
  });

});
