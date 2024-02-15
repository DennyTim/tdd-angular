import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "./alert/alert.component";
import { ButtonComponent } from "./button/button.component";
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    AlertComponent,
    ButtonComponent,
    NavbarComponent
  ],
  exports: [
    AlertComponent,
    ButtonComponent,
    NavbarComponent
  ]
})
export class SharedModule {
}
