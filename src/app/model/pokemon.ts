import { Ability } from './ability';

export interface Pokemon {
  height: number;
  id: number;
  weight: number;
  name: string;
  url: string;
  abilities: ReadonlyArray<Ability>;
  isDetailAvailable: boolean;
  image: string;
}
