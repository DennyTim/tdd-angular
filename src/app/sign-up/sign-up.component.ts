import { Component } from '@angular/core';
import { UserService } from "../core/user.service";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.css' ]
})
export class SignUpComponent {

  form = new FormGroup({
    username: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    email: new FormControl<string>(""),
    password: new FormControl<string>(""),
    passwordRepeat: new FormControl<string>(""),
  });

  apiProgress = false;
  signUpSuccess = false;

  constructor(private userService: UserService) {
  }

  get usernameError() {
    const field = this.form.get('username');
    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors['required']) {
        return "Username is required";
      } else {
        return "Username must be at least 4 characters long"
      }
    }
    return;
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
