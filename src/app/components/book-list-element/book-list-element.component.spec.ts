import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListElementComponent } from './book-list-element.component';

describe('BookListElementComponent', () => {
  let component: BookListElementComponent;
  let fixture: ComponentFixture<BookListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
