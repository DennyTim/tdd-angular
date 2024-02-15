import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivateComponent} from './activate.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscriber} from "rxjs";
import {AlertComponent} from "../shared/alert/alert.component";

type RouteParams = {
  id: string;
}

describe('ActivateComponent', () => {
  let component: ActivateComponent;
  let fixture: ComponentFixture<ActivateComponent>;
  let httpTestingController: HttpTestingController;
  let subscriber!: Subscriber<RouteParams>;

  beforeEach(async () => {
    const observable = new Observable<RouteParams>(sub => subscriber = sub);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        ActivateComponent,
        AlertComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: observable
          }
        }
      ]
    })
      .compileComponents();
  })

  beforeEach(async () => {
    fixture = TestBed.createComponent(ActivateComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should component be activated', () => {
    expect(component).toBeTruthy();
  });

  it('Sends account activation request', () => {
    subscriber.next({id: '123'});

    const requests = httpTestingController.match('/api/1.0/users/token/123');

    expect(requests.length).toBe(1);
  });

  it('displays activation success message when token is valid', () => {
    subscriber.next({id: '123'});
    const requests = httpTestingController.expectOne('/api/1.0/users/token/123');

    requests.flush({});
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert');
    console.log(alert);
    expect(alert.textContent).toContain('Account is activated');

  })

  it('displays activation failure message when token is invalid', () => {
    subscriber.next({id: '456'});
    const requests = httpTestingController.expectOne('/api/1.0/users/token/456');

    requests.flush({}, {status: 400, statusText: 'Bad Request'});
    fixture.detectChanges();

    const alert = fixture.nativeElement.querySelector('.alert');
    expect(alert.textContent).toContain('Activation failure');
  });
});
