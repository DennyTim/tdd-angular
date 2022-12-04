import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";


describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ SignUpComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  describe('Layout', () => {
    it('has Sign Up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1?.textContent).toBe('Sign Up');
    });

    it('has username input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="username"]')
      const input = signUp.querySelector('input[id="username"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Username');
    });

    it('has email input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="email"]')
      const input = signUp.querySelector('input[id="email"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('E-mail');
    });

    it('has password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="password"]')
      const input = signUp.querySelector('input[id="password"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password');
    });

    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="password"]') as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('has password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="passwordRepeat"]')
      const input = signUp.querySelector('input[id="passwordRepeat"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password Repeat');
    });

    it('has password type for password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="passwordRepeat"]') as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('has Sign Up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.textContent).toContain('Sign Up');
    });

    it('disables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    let button: any;
    let signUp: HTMLElement;
    let httpTestingController: HttpTestingController;

    const setupForm = () => {
      httpTestingController = TestBed.inject(HttpTestingController);
      signUp = fixture.nativeElement as HTMLElement;
      button = signUp.querySelector('button');

      const usernameInput = signUp.querySelector('input[id="username"]') as HTMLInputElement;
      const emailInput = signUp.querySelector('input[id="email"]') as HTMLInputElement;
      const passwordInput = signUp.querySelector('input[id="password"]') as HTMLInputElement;
      const passwordRepeatInput = signUp.querySelector('input[id="passwordRepeat"]') as HTMLInputElement;

      usernameInput.value = "user1";
      emailInput.value = "user1@mail.com";
      passwordInput.value = 'P4ssword';
      passwordRepeatInput.value = 'P4ssword';

      usernameInput.dispatchEvent(new Event('input'));
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));
      passwordRepeatInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
    }

    it('enables the button when the password and password repeat fields have same value', () => {
      setupForm();
      expect(button?.disabled).toBeFalsy();
    });

    it('sends username, email and password to BE after clicking the button', () => {
      setupForm();
      button?.click();

      const req = httpTestingController.expectOne("/api/1.0/users");
      const requestBody = req.request.body

      expect(requestBody).toEqual({
        username: "user1",
        password: 'P4ssword',
        email: "user1@mail.com",
      });
    });

    it('disables button when there is an ongoing api call', () => {
      setupForm();
      button?.click();
      fixture.detectChanges();
      button?.click();

      httpTestingController.expectOne("/api/1.0/users");
      expect(button.disabled).toBeTruthy();
    });

    it('displays spinner after clicking the submit', () => {
      setupForm();
      expect(signUp.querySelector('span[role="status"]')).toBeFalsy();
      button.click();
      fixture.detectChanges();
      expect(signUp.querySelector('span[role="status"]')).toBeTruthy();
    });
  });
});


