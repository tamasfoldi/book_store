import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { GoogleBooksService } from './google-books.service';
import { BOOKS_API_BASE } from './tokens';
import { BaseRequestOptions, Response, ConnectionBackend, Http, RequestMethod, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
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

    it('should return with the required book',
      inject([GoogleBooksService, MockBackend], (gbService: GoogleBooksService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe(`${testData.TEST_BASE_URL}/${bookId}`);
          expect(c.request.method).toBe(RequestMethod.Get);
          const response = new ResponseOptions({ body: testData.TEST_BOOK });
          c.mockRespond(new Response(response));
        });

        gbService.getBook(bookId).subscribe(result => res = result);

        expect(res).toEqual(testData.TEST_BOOK);
      }));
  });
});


