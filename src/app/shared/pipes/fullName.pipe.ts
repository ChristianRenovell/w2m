import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(value: string, defaultValue: string = 'Unknown'): string {
    return value ? value : defaultValue;
  }
}
