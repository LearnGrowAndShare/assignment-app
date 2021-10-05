import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() pokemons: Array<Pokemon> | null = [];

  @Output() cardSelection: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  constructor() {}

  ngOnInit(): void {}

  pokeMon($event: Pokemon) {
    this.cardSelection.emit($event);
  }
}
