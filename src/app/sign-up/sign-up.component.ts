import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { UserService } from "../core/user.service";
import { passwordMatchValidator } from "./password-match.validator";
import { UniqueEmailValidator } from "./unique-email.validator";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent {

  form = new FormGroup({
    username: new FormControl<string>("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    email: new FormControl<string>("", {
      validators: [
        Validators.required,
        Validators.email
      ],
      asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],
      updateOn: "blur"
    }),
    password: new FormControl<string>("", [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    ]),
    passwordRepeat: new FormControl<string>("")
  }, { validators: passwordMatchValidator });

  apiProgress = false;
  signUpSuccess = false;

  constructor(
    private userService: UserService,
    private uniqueEmailValidator: UniqueEmailValidator
  ) {
  }

  get usernameError() {
    const field = this.form.get("username");
    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors["required"]) {
        return "Username is required";
      } else {
        return "Username must be at least 4 characters long";
      }
    }
    return;
  }

  get emailError() {
    const field = this.form.get("email");
    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors["required"]) {
        return "E-mail is required";
      } else if (field.errors["email"]) {
        return "Invalid e-mail address";
      } else if (field.errors["uniqueEmail"]) {
        return "E-mail in use";
      } else if (field.errors["backend"]) {
        return field.errors["backend"];
      }
    }
    return;
  }

  get passwordError() {
    const field = this.form.get("password");
    if ((field?.errors && (field?.touched || field?.dirty))) {
      if (field.errors["required"]) {
        return "Password is required";
      } else if (field.errors["pattern"]) {
        return "Password must have at least 1 uppercase, 1 lowercase letter and 1 number";
      }
    }
    return;
  }

  get getPasswordRepeatError() {
    if (this.form?.errors && (this.form?.touched || this.form?.dirty)) {
      if (this.form?.errors["passwordMatch"]) {
        return "Password mismatch";
      }
    }
    return;
  }

  onClickSignUp() {
    const body = this.form.value;
    delete body.passwordRepeat;

    this.apiProgress = true;
    this.userService.signUp(body as any).subscribe({
      next: () => {
        this.signUpSuccess = true;
      },
      error: (httpError: HttpErrorResponse) => {
        const emailValidationErrorMessage = httpError.error.validationErrors.email;
        this.form.get("email")?.setErrors({ backend: emailValidationErrorMessage });
        this.apiProgress = false;
      }
    });
  }

  isDisabled() {
    const formFilled = this.form.get('username')?.value
      && this.form.get('email')?.value
      && this.form.get("password")?.value
      && this.form.get("passwordRepeat")?.value;

    const validationError = this.usernameError
      || this.emailError
      || this.passwordError
      || this.getPasswordRepeatError;

    return !!(!formFilled || validationError);
  }
}
