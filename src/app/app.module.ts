import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { GoogleBooksService } from './services/google-books.service';
import { BOOKS_API_BASE } from './services/tokens';
import { environment } from '../environments/environment';
import { reducer } from './reducers';
import { BooksEffects } from './effects/books.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(BooksEffects)
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
