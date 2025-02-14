import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcatigory',
  standalone: true
})
export class SubcatigoryPipe implements PipeTransform {

  transform(products: any[], term: string): any[] {

    return products.filter((product) => product.subCatigory.toLowerCase().includes(term.toLocaleLowerCase()));
  }



}
