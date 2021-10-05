import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './shared/loading/loading/loading.component';

const routes: Routes = [
  { path: '', component: LoadingComponent },
  { path: 'pokemon', loadChildren: () => import('./pokemon/pokemon.module').then((m) => m.PokemonModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
