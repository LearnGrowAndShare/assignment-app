import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonReponse } from 'src/app/model/pokemon-response';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() pokemons: Array<Pokemon> | null = [];

  @Output() cardSelection: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  pokeMon($event: Pokemon) {
    this.cardSelection.emit($event);
  }
}
