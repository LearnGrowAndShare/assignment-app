import { Sort } from 'src/app/model/sort-direction';
import { TestPokemons } from 'src/app/test/test.constant';
import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty array on no item', () => {
    const pipe = new SortPipe();
    const expected = pipe.transform(null, { direction: Sort.Ascending, name: 'name' });
    expect(expected).toStrictEqual([]);
  });

  it('should return empty array on no item passed', () => {
    const pipe = new SortPipe();
    const expected = pipe.transform([], { direction: Sort.Ascending, name: 'name' });
    expect(expected).toStrictEqual([]);
  });

  it('should return sorted array in ascending fashion by name', () => {
    const pipe = new SortPipe();
    const expected = pipe.transform(TestPokemons.reverse(), { direction: Sort.Ascending, name: 'name' });
    expect(expected[0].name).toBe('pidgeot');
    expect(expected[1].name).toBe('raticate');
  });

  it('should return sorted array in decending fashion by name', () => {
    const pipe = new SortPipe();
    const expected = pipe.transform(TestPokemons, { direction: Sort.Decending, name: 'name' });
    expect(expected[1].name).toBe('pidgeot');
    expect(expected[0].name).toBe('raticate');
  });

  it('should return sorted array in ascending fashion by height', () => {
    const pipe = new SortPipe();
    const expected = pipe.transform(TestPokemons.reverse(), { direction: Sort.Ascending, name: 'height' });
    expect(expected[1].name).toBe('pidgeot');
    expect(expected[0].name).toBe('raticate');
  });

  it('should return sorted array in decending fashion by height', () => {
    const pipe = new SortPipe();
    const expected = pipe.transform(TestPokemons.reverse(), { direction: Sort.Decending, name: 'height' });
    expect(expected[0].name).toBe('pidgeot');
    expect(expected[1].name).toBe('raticate');
  });

  it('should return sorted array in ascending fashion by Weight', () => {
    const pipe = new SortPipe();
    const expected = pipe.transform(TestPokemons.reverse(), { direction: Sort.Ascending, name: 'weight' });
    expect(expected[1].name).toBe('pidgeot');
    expect(expected[0].name).toBe('raticate');
  });

  it('should return sorted array in Decending fashion by Weight', () => {
    const pipe = new SortPipe();
    const expected = pipe.transform(TestPokemons.reverse(), { direction: Sort.Decending, name: 'weight' });
    expect(expected[0].name).toBe('pidgeot');
    expect(expected[1].name).toBe('raticate');
  });
});
