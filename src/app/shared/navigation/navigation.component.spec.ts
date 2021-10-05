import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should have 2 nav menu item', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const app = fixture.componentInstance;
    const items: HTMLDivElement = fixture.debugElement.nativeElement.querySelector('#navbarBasicExample');
    expect(items.childElementCount).toBe(2);
  });
});
