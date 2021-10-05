import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { Sort } from 'src/app/model/sort-direction';

const getKeyValue =
  <U extends keyof T, T extends object>(key: U) =>
  (obj: T) =>
    obj[key];

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Array<Pokemon> | null, sorting: { name: string; direction: Sort }): Array<Pokemon> {
    if (value === null) {
      return [];
    }

    console.log(sorting);
    return this.performSorting(value, sorting.name, sorting.direction);
  }

  private performSorting(value: Array<Pokemon>, propertyName: string, direction: Sort): Array<Pokemon> {
    const sorted = value.sort((a: any, b: any) => {
      if (a[propertyName] < b[propertyName]) return -1;
      else if (a[propertyName] > b[propertyName]) return 1;
      else return 0;
    });
    return direction === Sort.Ascending ? sorted : sorted.reverse();
  }
}
