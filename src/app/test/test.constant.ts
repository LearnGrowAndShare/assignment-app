import { Pokemon } from '../model/pokemon';

export const TestPokemons: Pokemon[] = [
  {
    name: 'pidgeot',
    url: 'https://pokeapi.co/api/v2/pokemon/18/',
    height: 15,
    weight: 395,
    abilities: [
      { name: 'keen-eye', url: 'https://pokeapi.co/api/v2/ability/51/' },
      { name: 'tangled-feet', url: 'https://pokeapi.co/api/v2/ability/77/' },
      { name: 'big-pecks', url: 'https://pokeapi.co/api/v2/ability/145/' },
    ],
    isDetailAvailable: true,
    id: 18,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
  },
  {
    name: 'raticate',
    url: 'https://pokeapi.co/api/v2/pokemon/20/',
    height: 7,
    weight: 185,
    abilities: [
      { name: 'run-away', url: 'https://pokeapi.co/api/v2/ability/50/' },
      { name: 'guts', url: 'https://pokeapi.co/api/v2/ability/62/' },
      { name: 'hustle', url: 'https://pokeapi.co/api/v2/ability/55/' },
    ],
    isDetailAvailable: true,
    id: 20,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png',
  },
];
