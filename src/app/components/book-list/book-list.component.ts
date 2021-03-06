import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  @Input('books')
  books: Book[];

  @Input('inCartIds')
  inCartIds: string[];

  @Input('title')
  title: string;

  @Input('isLoading')
  isLoading: boolean;

  @Output('onAdd')
  onAdd = new EventEmitter<Book>();


}
