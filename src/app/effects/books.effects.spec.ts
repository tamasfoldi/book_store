import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { BooksEffects } from './books.effects';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import * as books from '../actions/books.actions';
import * as testData from '../../test-datas';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { empty } from 'rxjs/observable/empty';
import { GoogleBooksService } from '../services/google-books.service';

describe('BookEffects', () => {
  let runner: EffectsRunner;
  let booksEffects: BooksEffects;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
    ],
    providers: [
      BooksEffects,
      {
        provide: GoogleBooksService,
        useValue: jasmine.createSpyObj('gbService', ['search', 'getBook'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    booksEffects = TestBed.get(BooksEffects);
  });

  describe('onLoad$', () => {
    it('should return a new LoadSuccessAction', fakeAsync(
      inject([GoogleBooksService], (gbService: GoogleBooksService) => {
        const expectedResult = new books.LoadSuccessAction(testData.TEST_BOOK);
        gbService.getBook = jasmine.createSpy('query').and.returnValue(of(testData.TEST_BOOK));
        runner.queue(new books.LoadAction(testData.TEST_BOOK.id));

        let result = null;
        booksEffects.onLoad$
          .take(1)
          .subscribe(_result => result = _result);

        expect(result).toEqual(expectedResult);
      })));

    it('should return a new LoadFailAction', fakeAsync(
      inject([GoogleBooksService], (gbService: GoogleBooksService) => {
        const expectedResult = new books.LoadFailAction('error');
        gbService.getBook = jasmine.createSpy('query').and.returnValue(_throw('error'));
        runner.queue(new books.LoadAction(testData.TEST_BOOK.id));

        let result = null;
        booksEffects.onLoad$
          .take(1)
          .subscribe(_result => result = _result);

        expect(result).toEqual(expectedResult);
      })));
  });

  describe('onSearch$', () => {
    it('should return a new SearchSuccessAction if query.lengh !== 0', fakeAsync(
      inject([GoogleBooksService], (gbService: GoogleBooksService) => {
        const expectedResult = new books.SearchSuccessAction([testData.TEST_BOOK]);
        gbService.search = jasmine.createSpy('search').and.returnValue(of([testData.TEST_BOOK]));
        runner.queue(new books.SearchAction('query'));

        let result = null;
        booksEffects.onSearch$
          .take(1)
          .subscribe(_result => result = _result);

        tick(300);

        expect(result).toEqual(expectedResult);
      })));

    it('should return null if query.length === 0', fakeAsync(
      inject([GoogleBooksService], (gbService: GoogleBooksService) => {
        const expectedResult = null;
        gbService.search = jasmine.createSpy('search').and.returnValue(of([testData.TEST_BOOK]));
        runner.queue(new books.SearchAction(''));

        let result = null;
        booksEffects.onSearch$
          .take(1)
          .subscribe(_result => result = _result);

        tick(300);

        expect(result).toEqual(expectedResult);
      })));

    it('should return a new SearchFailAction', fakeAsync(
      inject([GoogleBooksService], (gbService: GoogleBooksService) => {
        const expectedResult = new books.SearchFailAction('error');
        gbService.search = jasmine.createSpy('search').and.returnValue(_throw('error'));
        runner.queue(new books.SearchAction('query'));

        let result = null;
        booksEffects.onSearch$
          .take(1)
          .subscribe(_result => result = _result);

        tick(300);

        expect(result).toEqual(expectedResult);
      })));
  });
});
