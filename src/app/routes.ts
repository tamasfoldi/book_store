import { Routes } from '@angular/router';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { BookDetailPageComponent } from './containers/book-detail-page/book-detail-page.component';
import { CartPageComponent } from './containers/cart-page/cart-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: 'books',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: ':id',
        component: BookDetailPageComponent
      }
    ]
  },
  {
    path: 'cart',
    component: CartPageComponent
  }
];
