import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonDetail } from 'src/app/model/pokemon-detail';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetails$!: Observable<PokemonDetail>;
  constructor(
    private readonly route: Router,
    private readonly activeRoute: ActivatedRoute,
    private readonly dataService: DataService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramsId) => {
      const id = paramsId.id;
      this.pokemonDetails$ = this.dataService.getPokemonById(id);
    });
  }

  goBack() {
    this.route.navigateByUrl('/pokemon');
  }
}
