import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { GoogleBooksService } from '../services/google-books.service';
import * as books from '../actions/books.actions';

@Injectable()
export class BooksEffects {
  @Effect()
  onSearch$: Observable<Action> = this.actions$
    .ofType(books.SEARCH)
    .map(toPayload)
    .switchMap(query => this.gbService.search(query)
      .map(bks => new books.SearchSuccessAction(bks))
      .catch(err => of(new books.SearchFailAction(err))));

  @Effect()
  onLoad$: Observable<Action> = this.actions$
    .ofType(books.LOAD)
    .map(toPayload)
    .switchMap(id => this.gbService.getBook(id)
      .map(book => new books.LoadSuccessAction(book))
      .catch(err => of(new books.LoadFailAction(err))));

  constructor(private actions$: Actions, private gbService: GoogleBooksService) { }
}
