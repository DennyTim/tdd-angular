import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from "../core/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.css' ]
})
export class SignUpComponent {

  userName = "";
  email = "";
  disabled = true;
  apiProgress = false;
  signUpSuccess = false;
  password: string = "";
  passwordRepeat: string = "";

  constructor(private userService: UserService) {
  }

  onChangeUsername(event: Event) {
    this.userName = (event.target as HTMLInputElement).value;
  }

  onChangeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value;
  }

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value
    this.disabled = this.password !== this.passwordRepeat;
  }

  onChangePasswordRepeat(event: Event) {
    this.passwordRepeat = (event.target as HTMLInputElement).value
    this.disabled = this.password !== this.passwordRepeat;
  }

  onClickSignUp() {
    this.apiProgress = true;
    this.userService.signUp({
      username: this.userName,
      password: this.password,
      email: this.email
    }).subscribe(() => {
      this.signUpSuccess = true;
    });
  }
}
