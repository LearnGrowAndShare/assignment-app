import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PokemonReponse } from '../model/pokemon-response';
import { Pokemon } from '../model/pokemon';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { PokemonDetail } from '../model/pokemon-detail';

/**
 * Data services - Provides http get functionalities against pokemon api
 */
@Injectable({ providedIn: 'root' })
export class DataService {
  /**
   * dataStore - holds all the fetch pokemon
   */
  private dataStore: { pokemons: Pokemon[] } = { pokemons: [] };

  public get pokemonCount(): number {
    return this.dataStore.pokemons ? this.dataStore.pokemons.length : 0;
  }

  /**
   * constructor
   * @param httpClient - {@link HttpClient} angular library for http calls.
   */
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get pokemon for the gives offset and pageSize from dataStore
   * @param offSet
   * @param pageSize
   * @returns
   */
  public getPokemon(offSet: number = 0, pageSize: number = 10): Observable<Pokemon[]> {
    if (this.dataStore.pokemons && this.dataStore.pokemons.length === 0) {
      return this.getAllPokemon().pipe(
        switchMap((data) => {
          const pokemonSliced = data.slice(offSet, offSet + pageSize);
          return this.fetchAndAssociateAdditionalDetailsToPokemon(pokemonSliced);
        })
      );
    } else {
      const pokemonSliced = this.dataStore.pokemons.slice(offSet, offSet + pageSize);
      if (pokemonSliced.every((x) => x.isDetailAvailable)) {
        return of(pokemonSliced);
      } else {
        return this.fetchAndAssociateAdditionalDetailsToPokemon(pokemonSliced);
      }
    }
  }

  getPokemonById(id: any): Observable<PokemonDetail> {
    return this.httpClient.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map((x: any) => {
        let data = {} as PokemonDetail;
        data.name = x.name;
        data.is_default = x.is_default;
        data.order = x.order;
        data.url = x.url;
        data.weight = x.weight;
        data.types = (x.types || []).map((k: any) => k.type.name);
        data.stats = x.stats.map((z: any) => ({ base_stat: z.base_stat, effort: z.effort, name: z.stat.name }));
        data.sprites = Object.values(x.sprites).filter((m) => typeof m === 'string') as string[];
        data.species = [x.species.name];
        data.moves = x.moves.map((z: any) => z.move.name);
        data.base_experience = x.base_experience;
        data.abilities = x.abilities.map((z: any) => z.ability);
        return data;
      })
    );
  }

  /**
   *
   * @param pokemonSliced
   * @returns
   */
  private fetchAndAssociateAdditionalDetailsToPokemon(pokemonSliced: Pokemon[]): Observable<Pokemon[]> {
    return forkJoin(pokemonSliced.map((request) => this.fetchPokemonAdditionalDetails(request.url, request)));
  }

  /**
   *
   * @param url
   * @param pokemon
   * @returns
   */
  private fetchPokemonAdditionalDetails(url: string, pokemon: Pokemon): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(url).pipe(
      map((response) => {
        let updateIndex = this.dataStore.pokemons.findIndex((x) => x.name === pokemon.name);
        const pokemonUpdate = {
          ...pokemon,
          height: response.height,
          weight: response.weight,
          abilities: response.abilities.map((x) => (x as any).ability),
          isDetailAvailable: true,
          id: response.id,
          image: (response as any).sprites.front_default,
        };

        this.dataStore.pokemons[updateIndex] = pokemonUpdate;
        console.log(JSON.stringify(pokemonUpdate));
        return pokemonUpdate;
      })
    );
  }

  /**
   *
   * @returns
   */
  private getAllPokemon(): Observable<Pokemon[]> {
    return this.httpClient.get<PokemonReponse>(`https://pokeapi.co/api/v2/pokemon?limit=1`).pipe(
      switchMap((data) =>
        this.httpClient.get<PokemonReponse>(`https://pokeapi.co/api/v2/pokemon?limit=${data.count}`).pipe(
          map((data) => data.results),
          tap((data) => (this.dataStore.pokemons = data))
        )
      )
    );
  }
}
