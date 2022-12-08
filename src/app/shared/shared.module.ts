import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from "./alert/alert.component";
import { ButtonComponent } from "./button/button.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    AlertComponent,
    ButtonComponent
  ],
  exports: [
    AlertComponent,
    ButtonComponent
  ]
})
export class SharedModule {
}
