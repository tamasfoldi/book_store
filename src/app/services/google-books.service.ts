import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { BOOKS_API_BASE } from './tokens';
import { Observable } from 'rxjs/Rx';
import { Book } from '../models/book';

@Injectable()
export class GoogleBooksService {

  constructor( @Inject(BOOKS_API_BASE) private baseUrl: string, private http: Http) { }

  search(query: string): Observable<Book[]> {
    return this.http.get(`${this.baseUrl}?q=${query}`)
      .map(rsp => rsp.json().items || []);
  }

  getBook(bookId: string): Observable<Book> {
    return this.http.get(`${this.baseUrl}/${bookId}`)
      .map(rsp => rsp.json());
  }

}
