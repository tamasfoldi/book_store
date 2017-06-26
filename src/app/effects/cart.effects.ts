import { Injectable, Inject } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import * as cart from '../actions/cart.actions';
import { SCHEMA_NAME, CART_DB_NAME } from '../services/tokens';
import { Book } from '../models/book';

@Injectable()
export class CartEffects {

  @Effect({ dispatch: false })
  openDb$: Observable<any> = defer(() => this.db.open(this.schemaName));

  @Effect()
  onLoad$: Observable<Action> = this.actions$
    .ofType(cart.LOAD)
    .startWith(new cart.LoadAction())
    .switchMap(() =>
      this.db.query(this.dbName)
        .toArray()
        .map((books: Book[]) => new cart.LoadSuccessAction(books))
        .catch(error => of(new cart.LoadFailAction(error)))
    );

  onAdd$: Observable<Action> = this.actions$
    .ofType(cart.ADD)
    .map(toPayload)
    .switchMap(book => this.db.insert(this.dbName, [book])
      .map(() => new cart.AddSuccessAction(book))
      .catch(() => of(new cart.AddFailAction(book)))
    );

  constructor(
    private actions$: Actions,
    private db: Database,
    @Inject(SCHEMA_NAME) private schemaName: string,
    @Inject(CART_DB_NAME) private dbName: string
  ) { }
}
