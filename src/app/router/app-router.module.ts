import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from "@angular/router";
import { SignUpComponent } from "../sign-up/sign-up.component";
import { HomeComponent } from "../home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {
}
