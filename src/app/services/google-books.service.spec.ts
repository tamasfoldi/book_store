import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Response, ConnectionBackend, Http, RequestMethod, ResponseOptions } from '@angular/http';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { GoogleBooksService } from './google-books.service';
import { BOOKS_API_BASE } from './tokens';
import * as testData from '../../test-datas';

describe('GoogleBooksService', () => {
  let res;
  beforeEach(() => {
    res = null;
    TestBed.configureTestingModule({
      providers: [
        GoogleBooksService,
        {
          provide: BOOKS_API_BASE,
          useValue: testData.TEST_BASE_URL
        },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);

          }, deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: Store,
          useClass: class {
            select = jasmine.createSpy('select');
            dispatch = jasmine.createSpy('dispatch');
          }
        }
      ]
    });
  });

  describe('search', () => {
    const search_query = 'query';

    it('should return with an empty array if there are no items',
      inject([GoogleBooksService, MockBackend], (gbService: GoogleBooksService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe(`${testData.TEST_BASE_URL}?q=${search_query}`);
          expect(c.request.method).toBe(RequestMethod.Get);
          const response = new ResponseOptions({ body: [] });
          c.mockRespond(new Response(response));
        });

        gbService.search(search_query).subscribe(result => res = result);

        expect(res).toEqual([]);
      }));

    it('should return with books for the given query',
      inject([GoogleBooksService, MockBackend], (gbService: GoogleBooksService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe(`${testData.TEST_BASE_URL}?q=${search_query}`);
          expect(c.request.method).toBe(RequestMethod.Get);
          const response = new ResponseOptions({ body: testData.QUERY_RESULT });
          c.mockRespond(new Response(response));
        });
        gbService.search(search_query).subscribe(result => res = result);


        expect(res).toEqual(testData.QUERY_RESULT.items);
      }));
  });

  describe('getBook', () => {
    const bookId = 'XkEvAAAAMAAJ';

    it('should call the GoogleAPI if the book is not in the Store and return with the response',
      inject([GoogleBooksService, MockBackend, Store], (gbService: GoogleBooksService, mockBackend: MockBackend, store: Store<any>) => {
        store.select = jasmine.createSpy('select').and.returnValue(of([]));
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe(`${testData.TEST_BASE_URL}/${bookId}`);
          expect(c.request.method).toBe(RequestMethod.Get);
          const response = new ResponseOptions({ body: testData.TEST_BOOK });
          c.mockRespond(new Response(response));
        });

        gbService.getBook(bookId).subscribe(result => res = result);

        expect(res).toEqual(testData.TEST_BOOK);
      }));

    it('should return with the required book from the store if it contains',
      inject([GoogleBooksService, MockBackend, Store], (gbService: GoogleBooksService, mockBackend: MockBackend, store: Store<any>) => {
        store.select = jasmine.createSpy('select').and.returnValue(of({ [testData.TEST_BOOK.id]: testData.TEST_BOOK }));

        gbService.getBook(bookId).subscribe(result => res = result);

        expect(res).toEqual(testData.TEST_BOOK);
      }));
  });
});


