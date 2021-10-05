import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';
import { Sort } from '../model/sort-direction';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;
  totalPokemons = 0;
  filterKey = '';
  sort: { name: string; direction: Sort } = { name: 'name', direction: Sort.Ascending };
  constructor(
    private readonly dataService: DataService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pokemons$ = this.dataService.getPokemon();
    this.totalPokemons = this.dataService.pokemonCount;
  }

  onSortChanged($event: { name: string; direction: Sort }) {
    this.sort = $event;
  }

  onPageChanged($event: { offset: number; limit: number }) {
    this.pokemons$ = this.dataService.getPokemon($event.offset * $event.limit, $event.limit);
  }

  onFilterChanged($event: string) {
    this.filterKey = $event;
  }

  onCardSelection($event: Pokemon) {
    this.router.navigate([$event.id], { relativeTo: this.route });
  }
}
