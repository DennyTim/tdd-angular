import { Component } from '@angular/core';
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

  isDisabled() {
    return this.password ? (this.password !== this.passwordRepeat) : true;
  }
}
