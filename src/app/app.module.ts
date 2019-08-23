import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './services/api.service';
import { LakesComponent } from './lakes/lakes.component';

@NgModule({
  declarations: [
    AppComponent,
    LakesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
