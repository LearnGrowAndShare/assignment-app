import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Pokemon[], args: string): Pokemon[] {
    if (!value) {
      return [];
    }

    if (!args) {
      return value;
    }
    return value.filter((x) => x.name.indexOf(args) > -1 || x.abilities.some((x) => x.name.indexOf(args) > -1));
  }
}
