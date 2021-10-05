import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../services/data.service';
import { TestPokemons } from '../test/test.constant';
import { FilterPipe } from './pipe/filter.pipe';
import { SortPipe } from './pipe/sort.pipe';

import { PokemonComponent } from './pokemon.component';

@Component({ selector: 'app-test', template: '<p> Test </p>' })
export class TestComponent {}

describe('PokemonComponent', () => {
  const dataServiceMock = {
    getPokemon: jest.fn(),
    pokemonCount: 10,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonComponent, SortPipe, FilterPipe, TestComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: DataService, useValue: dataServiceMock }],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: TestComponent },
          { path: ':id', component: TestComponent },
        ]),
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PokemonComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should call api to fetch first 10 records from service', () => {
    const fixture = TestBed.createComponent(PokemonComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();

    expect(app.totalPokemons).toEqual(10);
    expect(dataServiceMock.getPokemon).toHaveBeenCalled();
    expect(app).toBeTruthy();
  });

  it('should call api to with pagination record from service', () => {
    const fixture = TestBed.createComponent(PokemonComponent);
    const app = fixture.componentInstance;
    app.onPageChanged({ limit: 20, offset: 10 });

    expect(dataServiceMock.getPokemon).toHaveBeenCalledWith(200, 20);
    expect(app).toBeTruthy();
  });

  it('should route to card details on card selection', () => {
    const fixture = TestBed.createComponent(PokemonComponent);
    const app = fixture.componentInstance;
    const router: Router = TestBed.get<Router>(Router);

    app.onCardSelection(TestPokemons[0]);

    expect(router.url).toBe('/');
  });
});
