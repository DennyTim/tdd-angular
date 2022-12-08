import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
