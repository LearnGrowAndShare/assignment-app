import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

import { PokemonDetailComponent } from './pokemon-detail.component';

describe('PokemonDetailComponent', () => {
  const dataServiceMock = {
    getPokemonById: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 18 }),
          },
        },
        { provide: DataService, useValue: dataServiceMock },
      ],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PokemonDetailComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should call api for the give id', () => {
    const fixture = TestBed.createComponent(PokemonDetailComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(dataServiceMock.getPokemonById).toHaveBeenCalledWith(18);
  });
});
