import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { BOOKS_API_BASE, SCHEMA_NAME, CART_DB_NAME } from './tokens';
import { Observable } from 'rxjs/Rx';
import { Book } from '../models/book';
import { State, getBooks } from '../reducers';


@Injectable()
export class GoogleBooksService {

  constructor(
    @Inject(BOOKS_API_BASE) private baseUrl: string,
    private http: Http,
    private store: Store<State>) { }

  search(query: string): Observable<Book[]> {
    return this.http.get(`${this.baseUrl}?q=${query}`)
      .map(rsp => rsp.json().items || []);
  }

  getBook(bookId: string): Observable<Book> {
    return this.store.select(getBooks)
      .map(books => books[bookId])
      .switchMap(book => book ? Observable.of(book) : this.http.get(`${this.baseUrl}/${bookId}`)
        .map(rsp => rsp.json()));
  }

}
