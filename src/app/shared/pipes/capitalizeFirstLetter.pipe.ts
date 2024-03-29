import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCapitalizeFirstLetter',
  standalone: true,
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
