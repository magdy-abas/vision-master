import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {


  transform(products: any[], term: string): any[] {

    return products.filter((product) => product.mainCatigory.toLowerCase().includes(term.toLocaleLowerCase()));
  }


}
