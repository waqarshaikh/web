import { LoggingInterceptor } from './word/logging.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WordComponent } from './word/word.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
