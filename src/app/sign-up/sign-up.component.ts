import { Component } from '@angular/core';
import { UserService } from "../core/user.service";
import {
  FormControl,
  FormGroup
} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.css' ]
})
export class SignUpComponent {

  form = new FormGroup({
    username: new FormControl<string>(""),
    email: new FormControl<string>(""),
    password: new FormControl<string>(""),
    passwordRepeat:  new FormControl<string>(""),
  });

  apiProgress = false;
  signUpSuccess = false;

  constructor(private userService: UserService) {
  }

  onClickSignUp() {
    const body = this.form.value;
    delete body.passwordRepeat;

    this.apiProgress = true;
    this.userService.signUp(body as any).subscribe(() => {
      this.signUpSuccess = true;
    });
  }

  isDisabled() {
    return this.form.get('password')?.value
      ? (this.form.get('password')?.value !== this.form.get('passwordRepeat')?.value)
      : true;
  }
}
