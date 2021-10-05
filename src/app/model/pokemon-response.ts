import { Pokemon } from './pokemon';

export interface PokemonReponse {
  count: number;
  results: Array<Pokemon>;
}
