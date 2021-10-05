import { TestPokemons } from 'src/app/test/test.constant';
import { FilterPipe } from './filter.pipe';

const testPokeMons = [];

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty array on no item', () => {
    const pipe = new FilterPipe();
    const expected = pipe.transform([], 'Text');
    expect(expected).toStrictEqual([]);
  });

  it('should return empty array on no match found', () => {
    const pipe = new FilterPipe();
    const expected = pipe.transform(TestPokemons, 'Text');
    expect(expected).toStrictEqual([]);
  });

  it('should return only found element by name array', () => {
    const pipe = new FilterPipe();
    const expected = pipe.transform(TestPokemons, 'pidgeot');
    expect(expected).toStrictEqual([TestPokemons[0]]);
  });

  it('should return only found element by ability array', () => {
    const pipe = new FilterPipe();
    const expected = pipe.transform(TestPokemons, 'keen-eye');
    expect(expected).toStrictEqual([TestPokemons[0]]);
  });
});
