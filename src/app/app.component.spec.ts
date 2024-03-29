import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AppRouterModule, routes} from "./router/app-router.module";
import { Router } from "@angular/router";
import { AppModule } from "./app.module";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {ActivateComponent} from "./activate/activate.component";
import {UserListComponent} from "./home/user-list/user-list.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let appComponent: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SignUpComponent,
        HomeComponent,
        LoginComponent,
        UserComponent,
        ActivateComponent,
        UserListComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        SharedModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
    appComponent = fixture.nativeElement;
  });

  describe('Routing', () => {

    const routingTests = [
      {
        path: '/',
        pageId: 'home-page'
      },
      {
        path: '/signup',
        pageId: 'sign-up-page'
      },
      {
        path: '/login',
        pageId: 'login-page'
      },
      {
        path: '/user/1',
        pageId: 'user-page'
      },
      {
        path: '/user/2',
        pageId: 'user-page'
      },
      {
        path: '/activate/123',
        pageId: 'activation-page'
      },
      {
        path: '/activate/456',
        pageId: 'activation-page'
      }
    ];

    routingTests.forEach((payload) => {
      const {
        path,
        pageId
      } = payload;
      it(`displays ${ pageId } when path is ${ path }`, async () => {
        await router.navigate([ path ]);
        fixture.detectChanges();
        const page = fixture.nativeElement.querySelector(`[data-testid="${ pageId }"]`);
        expect(page).toBeTruthy();
      })
    })

    const linkTests = [
      {
        path: '/',
        title: 'Home'
      },
      {
        path: '/signup',
        title: 'Sign Up'
      },
      {
        path: '/login',
        title: 'Login'
      }
    ];

    linkTests.forEach((item) => {
      const {
        path,
        title
      } = item;

      it(`has link with title ${ title } to ${ path }`, () => {
        const linkElement = appComponent.querySelector(`a[title="${ title }"]`) as HTMLAnchorElement;

        expect(linkElement.pathname).toEqual(path);
      })
    })

    const navigationTests = [
      {
        initialPath: '/',
        clickingTo: 'Sign Up',
        visiblePage: 'sign-up-page'
      },
      {
        initialPath: '/signup',
        clickingTo: 'Home',
        visiblePage: 'home-page'
      },
      {
        initialPath: '/',
        clickingTo: 'Login',
        visiblePage: 'login-page'
      }
    ];

    navigationTests.forEach((item) => {
      const {
        initialPath,
        clickingTo,
        visiblePage
      } = item;
      it(`displays ${ visiblePage } after clicking ${ clickingTo } link`, fakeAsync(async () => {
        await router.navigate([ initialPath ]);

        const linkElement = appComponent.querySelector(`a[title="${ clickingTo }"]`) as HTMLAnchorElement;
        await linkElement.click();

        tick();
        fixture.detectChanges();

        const page = fixture.nativeElement.querySelector(`[data-testid="${ visiblePage }"]`);
        expect(page).toBeTruthy();
      }));
    });
  })
});
