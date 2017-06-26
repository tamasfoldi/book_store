import { Action } from '@ngrx/store';
import { Book } from '../models/book';
import { ApiError } from '../models/api_error';

export const SEARCH = '[BOOKS] Search';
export const SEARCH_SUCCESS = '[BOOKS] Search Success';
export const SEARCH_FAIL = '[BOOKS] Search Fail';

export const LOAD = '[BOOKS] Load';
export const LOAD_SUCCESS = '[BOOKS] Load Success';
export const LOAD_FAIL = '[BOOKS] Load Fail';

export const SELECT = '[BOOKS] Select';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: Book[]) { }
}

export class SearchFailAction implements Action {
  readonly type = SEARCH_FAIL;

  constructor(public payload: ApiError) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: string) { }
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Book) { }
}

export class LoadFailAction implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: ApiError) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) { }
}

export type Actions = SearchAction
  | SearchSuccessAction
  | SearchFailAction

  | LoadAction
  | LoadSuccessAction
  | LoadFailAction

  | SelectAction;
