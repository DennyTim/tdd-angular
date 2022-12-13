import { Component } from '@angular/core';
import { UserService } from "../core/user.service";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { passwordMatchValidator } from "./password-match.validator";

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
    email: new FormControl<string>("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>("", [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    ]),
    passwordRepeat: new FormControl<string>(""),
  }, { validators: passwordMatchValidator });

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

  get emailError() {
    const field = this.form.get('email');
    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors['required']) {
        return "E-mail is required";
      } else if (field.errors['email']) {
        return "Invalid e-mail address"
      }
    }
    return;
  }

  get passwordError() {
    const field = this.form.get('password');
    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors['required']) {
        return "Password is required";
      } else if (field.errors['pattern']) {
        return "Password must have at least 1 uppercase, 1 lowercase letter and 1 number";
      }
    }
    return;
  }

  get getPasswordRepeatError() {
    if (this.form?.errors && (this.form?.touched || this.form?.dirty)) {
      if (this.form?.errors['passwordMatch']) {
        return "Password mismatch";
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
