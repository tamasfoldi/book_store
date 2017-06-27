import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as books from '../../actions/books.actions';
import * as cart from '../../actions/cart.actions';
import * as fromRoot from '../../reducers';
import { Book } from '../../models/book';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  query$: Observable<string>;
  books$: Observable<Book[]>;
  inCartIds$: Observable<string[]>;
  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.books$ = this.store.select(fromRoot.getSearchBooks);
    this.inCartIds$ = this.store.select(fromRoot.getCartBookIds);
    this.query$ = this.store.select(fromRoot.getSearchQuery);
    this.isLoading$ = this.store.select(fromRoot.getSearchIsLoading);
  }

  search(query: string) {
    this.store.dispatch(new books.SearchAction(query));
  }

  handleAdd(book: Book) {
    this.store.dispatch(new cart.AddAction(book));
  }

}
