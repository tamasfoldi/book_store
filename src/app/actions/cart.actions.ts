import { Action } from '@ngrx/store';
import { Book } from '../models/book';
import { ApiError } from '../models/api_error';

export const ADD = '[CART] Add';
export const ADD_SUCCESS = '[CART] Add Success';
export const ADD_FAIL = '[CART] Add Fail';

export const LOAD = '[CART] Load';
export const LOAD_SUCCESS = '[CART] Load Success';
export const LOAD_FAIL = '[CART] Load Fail';

export class AddAction implements Action {
  readonly type = ADD;

  constructor(public payload: Book) { }
}

export class AddSuccessAction implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Book) { }
}

export class AddFailAction implements Action {
  readonly type = ADD_FAIL;

  constructor(public payload: ApiError) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Book[]) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: ApiError) { }
}

export type Actions = AddAction
  | AddSuccessAction
  | AddFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction;
