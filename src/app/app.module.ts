import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { GoogleBooksService } from './services/google-books.service';
import { BOOKS_API_BASE } from './services/tokens';
import { environment } from '../environments/environment';
import { reducer } from './reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer)
  ],
  providers: [
    GoogleBooksService,

    {
      provide: BOOKS_API_BASE,
      useValue: environment.booksBaseUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
