import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CardsComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
