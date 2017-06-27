import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs/Rx';
import * as fromRoot from '../../reducers';
import * as books from '../../actions/books.actions';
import * as cart from '../../actions/cart.actions';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail-page',
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.css']
})
export class BookDetailPageComponent implements OnInit, OnDestroy {
  componentDestroyed$ = new Subject();
  book$: Observable<Book>;
  isInCart$: Observable<boolean>;
  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .takeUntil(this.componentDestroyed$)
      .map(params => params['id'])
      .subscribe(id => {
        this.store.dispatch(new books.LoadAction(id));
        this.store.dispatch(new books.SelectAction(id));
      });

    this.book$ = this.store.select(fromRoot.getSelectedBook);
    this.isInCart$ = this.book$
      .filter(book => !!book)
      .combineLatest(this.store.select(fromRoot.getCartBookIds), (book, ids) => ids.includes(book.id));
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  handleAdd(book: Book) {
    this.store.dispatch(new cart.AddAction(book));
  }

}
