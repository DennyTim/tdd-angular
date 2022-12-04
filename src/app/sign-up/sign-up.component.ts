import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.css' ]
})
export class SignUpComponent {

  public userName = "";
  public email = "";
  public disabled = true;
  private password: string = "";
  private passwordRepeat: string = "";

  constructor(private httpClient: HttpClient) {
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
    // fetch("/api/1.0/users", {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     username: this.userName,
    //     password: this.password,
    //     email: this.email
    //   }),
    //   headers: { "Content-Type": "application/json" }
    // })
    this.httpClient.post("/api/1.0/users", {
      username: this.userName,
      password: this.password,
      email: this.email
    }).subscribe(() => {})
  }
}
