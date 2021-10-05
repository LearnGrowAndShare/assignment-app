import { Pokemon } from './pokemon';

export interface PokemonDetail extends Pokemon {
  moves: string[];
  is_default: boolean;
  order: number;
  species: string[];
  sprites: string[];
  stats: Stats[];
  types: string[];
  base_experience: number;
}

export interface Stats {
  base_stat: number;
  effort: 0;
  name: string;
}
