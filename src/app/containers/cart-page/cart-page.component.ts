import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import * as fromRoot from '../../reducers';
import { Book } from '../../models/book';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  books$: Observable<Book[]>;
  inCartIds$: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.books$ = this.store.select(fromRoot.getCartBooks);
    this.inCartIds$ = this.store.select(fromRoot.getCartBookIds);
    this.isLoading$ = this.store.select(fromRoot.getCartIsLoading);
  }

}
