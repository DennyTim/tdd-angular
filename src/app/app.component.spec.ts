import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from "./router/app-router.module";
import { Router } from "@angular/router";
import { AppModule } from "./app.module";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Routing', () => {
    it('displays homepage at /', async () => {
      await router.navigate([ '/' ]);
      fixture.detectChanges();
      const page = fixture.nativeElement.querySelector('[data-testid="home-page"]');
      expect(page).toBeTruthy();
    })

    it('displays homepage at /signup', async () => {
      await router.navigate([ '/signup' ]);
      fixture.detectChanges();
      const page = fixture.nativeElement.querySelector('[data-testid="sign-up-page"]');
      expect(page).toBeTruthy();
    })
  })
});
