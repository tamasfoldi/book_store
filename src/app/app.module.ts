import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DBModule } from '@ngrx/db';

import { AppComponent } from './app.component';
import { GoogleBooksService } from './services/google-books.service';
import { BOOKS_API_BASE, SCHEMA_NAME, CART_DB_NAME } from './services/tokens';
import { environment } from '../environments/environment';
import { reducer } from './reducers';
import { BooksEffects } from './effects/books.effects';
import { CartEffects } from './effects/cart.effects';
import { schema } from './db';
import { CartPageComponent } from './containers/cart-page/cart-page.component';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { BookDetailPageComponent } from './containers/book-detail-page/book-detail-page.component';
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    CartPageComponent,
    SearchPageComponent,
    BookDetailPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),

    DBModule.provideDB(schema),

    EffectsModule.run(BooksEffects),
    EffectsModule.run(CartEffects),

    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore()
  ],
  providers: [
    GoogleBooksService,
    {
      provide: BOOKS_API_BASE,
      useValue: environment.booksBaseUrl
    },
    {
      provide: SCHEMA_NAME,
      useValue: environment.schemaName
    },
    {
      provide: CART_DB_NAME,
      useValue: environment.cartDBName
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
