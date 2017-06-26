import { Action } from '@ngrx/store';
import { Book } from '../models/book';
import { ApiError } from '../models/api_error';

export const ADD = '[CART] Add';

export class AddAction implements Action {
  readonly type = ADD;

  constructor(public payload: string) { }
}

export type Actions = AddAction;
