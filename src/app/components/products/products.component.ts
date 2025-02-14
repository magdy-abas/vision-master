import { Component, inject, OnInit, signal } from '@angular/core';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProdctsService } from '../../core/services/prodcts-service.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CategoryPipe } from '../../core/pipes/category.pipe';
import { SubcatigoryPipe } from '../../core/pipes/subcatigory.pipe';
import { TruncatePipe } from '../../core/pipes/truncate';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgFor,
    CategoryPipe,
    SubcatigoryPipe,
    TruncatePipe,
    TranslateModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsList = signal<Iproduct[]>([]);
  mainValue = signal<string>('');
  subValue = signal<string>('');

  mainOptions = [
    { value: '', label: 'All Categories' },
    {
      value: 'Coating & decorations colours',
      label: 'Coating & decorations colours',
    },
    { value: 'Decal', label: 'Decal' },
    { value: 'Porcelain', label: 'Porcelain' },
    { value: 'Glass', label: 'Glass' },
  ];

  supOption = [
    { value: '', label: 'All Categories' },
    { value: 'Glass & Ceramic colours', label: 'Glass & Ceramic colours' },
    { value: 'Organic Colours', label: 'Organic Colours' },
    { value: 'Luster', label: 'Luster' },
    { value: 'Materials', label: 'Materials' },
    { value: 'Pattern', label: 'Pattern' },
    { value: 'Plain', label: 'Plain' },
    { value: 'Decorated', label: 'Decorated' },
  ];

  private prodctsService = inject(ProdctsService);
  private spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.prodctsService.getprodcts().subscribe((res) => {
        this.productsList.set(res);
        this.spinner.hide();
      });
    }, 1000);
  }
}
