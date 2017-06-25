// tslint:disable:quotemark
// tslint:disable:max-line-length
// tslint:disable:no-use-before-declare

import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { GoogleBooksService } from './google-books.service';
import { BOOKS_API_BASE } from './tokens';
import { BaseRequestOptions, Response, ConnectionBackend, Http, RequestMethod, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('GoogleBooksService', () => {
  let res;
  beforeEach(() => {
    res = null;
    TestBed.configureTestingModule({
      providers: [
        GoogleBooksService,
        {
          provide: BOOKS_API_BASE,
          useValue: TEST_BASE_URL
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
          expect(c.request.url).toBe(`${TEST_BASE_URL}?q=${search_query}`);
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
          expect(c.request.url).toBe(`${TEST_BASE_URL}?q=${search_query}`);
          expect(c.request.method).toBe(RequestMethod.Get);
          const response = new ResponseOptions({ body: QUERY_RESULT });
          c.mockRespond(new Response(response));
        });
        gbService.search(search_query).subscribe(result => res = result);


        expect(res).toEqual(QUERY_RESULT.items);
      }));
  });

  describe('getBook', () => {
    const bookId = 'XkEvAAAAMAAJ';

    it('should return with the required book',
      inject([GoogleBooksService, MockBackend], (gbService: GoogleBooksService, mockBackend: MockBackend) => {
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe(`${TEST_BASE_URL}/${bookId}`);
          expect(c.request.method).toBe(RequestMethod.Get);
          const response = new ResponseOptions({ body: TEST_BOOK });
          c.mockRespond(new Response(response));
        });

        gbService.getBook(bookId).subscribe(result => res = result);

        expect(res).toEqual(TEST_BOOK);
      }));
  });
});

const TEST_BASE_URL = 'test_base_url';
const QUERY_RESULT = {
  "items": [
    {
      "kind": "books#volume",
      "id": "XkEvAAAAMAAJ",
      "etag": "hry3uvBqR5E",
      "selfLink": "https://www.googleapis.com/books/v1/volumes/XkEvAAAAMAAJ",
      "volumeInfo": {
        "title": "Query",
        "publishedDate": "1938",
        "industryIdentifiers": [
          {
            "type": "OTHER",
            "identifier": "UOM:39015047697910"
          }
        ],
        "readingModes": {
          "text": false,
          "image": false
        },
        "printType": "BOOK",
        "categories": [
          "Biography & Autobiography"
        ],
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "preview-1.0.0",
        "language": "en",
        "previewLink": "http://books.google.hu/books?id=XkEvAAAAMAAJ&q=query&dq=query&hl=&cd=1&source=gbs_api",
        "infoLink": "http://books.google.hu/books?id=XkEvAAAAMAAJ&dq=query&hl=&source=gbs_api",
        "canonicalVolumeLink": "https://books.google.com/books/about/Query.html?hl=&id=XkEvAAAAMAAJ"
      },
      "saleInfo": {
        "country": "HU",
        "saleability": "NOT_FOR_SALE",
        "isEbook": false
      },
      "accessInfo": {
        "country": "HU",
        "viewability": "NO_PAGES",
        "embeddable": false,
        "publicDomain": false,
        "textToSpeechPermission": "ALLOWED",
        "epub": {
          "isAvailable": false
        },
        "pdf": {
          "isAvailable": false
        },
        "webReaderLink": "http://play.google.com/books/reader?id=XkEvAAAAMAAJ&hl=&printsec=frontcover&source=gbs_api",
        "accessViewStatus": "NONE",
        "quoteSharingAllowed": false
      }
    }
  ]
};

const TEST_BOOK = {
  "kind": "books#volume",
  "id": "XkEvAAAAMAAJ",
  "etag": "qX+/fgI8vqI",
  "selfLink": "https://www.googleapis.com/books/v1/volumes/XkEvAAAAMAAJ",
  "volumeInfo": {
    "title": "Query",
    "publisher": "Query Publications.",
    "publishedDate": "1938",
    "readingModes": {
      "text": false,
      "image": false
    },
    "pageCount": 92,
    "printedPageCount": 92,
    "dimensions": {
      "height": "31.00 cm"
    },
    "printType": "BOOK",
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=XkEvAAAAMAAJ&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE73Yo_In32RsHkMRByb8h-hzU3X2EKmkT6EQDHZXvfPcFEnsGblroMq9D7QJCeVXhkHYWwZ-_yI32_jhiSysTOrBzjSJqXTwtS4jsZY3db7XW4fgYEQ&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=XkEvAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71RMhJ5dsWLysYxlVT99d12iuPBJeGClBP32Nr-_--krJ8zBOmEIxut0MgEKNfp7ji3JSM2SUpyNNHN_UZz_wpFcJS2O2tcjgMyLtYYOykztozPF4U&source=gbs_api",
      "small": "http://books.google.com/books/content?id=XkEvAAAAMAAJ&printsec=frontcover&img=1&zoom=2&imgtk=AFLRE72chPujLGbUDQrj-0-16uAiq7Xm9aD4vADJXA6eyKvKJDI-HWtSACA0dMaOmW1NvBmP5WBkaamrNLVMpzdnjrhOYnYbw4l8TEkvw7iRJKjd_thKRKc&source=gbs_api",
      "medium": "http://books.google.com/books/content?id=XkEvAAAAMAAJ&printsec=frontcover&img=1&zoom=3&imgtk=AFLRE71njYgyXr7eaSj96bYGb4ZXtsf7Ess1Da15cMg4SuXHBnbqLSs3LBi1XK91335cK3mDcArzZ_7ZgB_DI5P4l0i7z_w73GK0COBLUxmPaF_3xDMzkNw&source=gbs_api",
      "large": "http://books.google.com/books/content?id=XkEvAAAAMAAJ&printsec=frontcover&img=1&zoom=4&imgtk=AFLRE73azQJkj2BGcjxIYyiu5KIIWac22hN1yCIg_wHEeN5xH1wAs9_5fDTUVwk98_yL6TuPaJHVKHUbijedEZkUZhCczCw-xuE8nvMzYiDPcrZkXD0nIDQ&source=gbs_api",
      "extraLarge": "http://books.google.com/books/content?id=XkEvAAAAMAAJ&printsec=frontcover&img=1&zoom=6&imgtk=AFLRE72KDsHf0CVHeVUyv8y2IkSfNxUE4TEZ4RntENcH_Kr8Rp3jirtXL9vrbi91yklyAND5lOCKXmQk6vjqCYYTqn32oN30IhoE4XEYIMsk0aUs-1Kz-MQ&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.hu/books?id=XkEvAAAAMAAJ&hl=&source=gbs_api",
    "infoLink": "https://play.google.com/store/books/details?id=XkEvAAAAMAAJ&source=gbs_api",
    "canonicalVolumeLink": "https://market.android.com/details?id=book-XkEvAAAAMAAJ"
  },
  "saleInfo": {
    "country": "HU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
  },
  "accessInfo": {
    "country": "HU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
      "isAvailable": false
    },
    "pdf": {
      "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=XkEvAAAAMAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
  }
};
