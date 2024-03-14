import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'translation'
})
export class TranslationPipe implements PipeTransform {
  transform(value: string, translations: { [key: string]: string }, defaultValue: string = 'Otros'): string {
    if (!value || !translations) {
      return defaultValue;
    }
    return translations[value] || defaultValue;
  }
}
