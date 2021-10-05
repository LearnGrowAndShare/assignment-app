import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { SharedModule } from '../shared/shared.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { SortPipe } from './pipe/sort.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { LoadingModule } from '../shared/loading/loading.module';

@NgModule({
  declarations: [PokemonComponent, PokemonDetailComponent, SortPipe, FilterPipe],
  imports: [CommonModule, SharedModule, LoadingModule, PokemonRoutingModule],
})
export class PokemonModule {}
