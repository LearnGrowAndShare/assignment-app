import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
@Component({ selector: 'app-test', template: '<p> Test </p>' })
export class TestComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, TestComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'pokemon', component: TestComponent }])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should redirect to pokemon if root url', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.componentInstance.ngOnInit();
    tick(201);
    fixture.detectChanges();
    const router: Router = TestBed.get<Router>(Router);
    expect(router.url).toBe('/pokemon');
    flush();
  }));
});
