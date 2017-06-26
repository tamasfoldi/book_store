import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import * as books from './actions/books.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private store: Store<State>) {
    this.store.dispatch(new books.SearchAction('query'));
  }
}
