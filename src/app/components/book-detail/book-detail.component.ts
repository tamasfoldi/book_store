import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  @Input('book')
  book: Book;

  @Input('isInCart')
  isInCart: boolean;

  @Output('onAdd')
  onAdd = new EventEmitter<Book>();
}
