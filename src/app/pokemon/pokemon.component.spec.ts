import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterPipe } from './pipe/filter.pipe';
import { SortPipe } from './pipe/sort.pipe';

import { PokemonComponent } from './pokemon.component';

describe('PokemonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonComponent, SortPipe, FilterPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PokemonComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
