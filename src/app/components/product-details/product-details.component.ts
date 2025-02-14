import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdctsService } from '../../core/services/prodcts-service.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Iproduct } from '../../core/interfaces/iproduct';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, TranslateModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _productservice = inject(ProdctsService);
  private readonly _NgwWowService = inject(NgwWowService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);

  detailesProduct: Iproduct | undefined = {} as Iproduct;
  customOptionsDetailes: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this._NgxSpinnerService.show();

    const routeSub = this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        const idProduct: string = p.get('id')!;

        const productSub = this._productservice
          .getSpacificProduct(idProduct)
          .subscribe((product) => {
            this.detailesProduct = product;
            this._NgxSpinnerService.hide();
          });

        this.subscriptions.add(productSub);
      },
    });

    this.subscriptions.add(routeSub);

    this._NgwWowService.init();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
