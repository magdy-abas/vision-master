import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, TranslateModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {
    this.spinner.show(); // Show spinner

    setTimeout(() => {
      this.spinner.hide(); // Hide spinner after 1 second
    }, 1000);
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    rtl: true,
    dots: true, // إظهار النقاط في الأسفل
    dotsData: true,
    autoplay: true, // تفعيل التشغيل التلقائي
    autoplayTimeout: 10000, // الوقت بين كل انتقال (3 ثوانٍ)
    dotsEach: true, // جعل النقاط لكل عنصر
    navText: ['', ''], // النص للأزرار
    responsive: {
      0: {
        items: 1, // عنصر واحد في الشاشات الصغيرة
      },
      400: {
        items: 1, // عنصرين في الشاشات المتوسطة
      },
      740: {
        items: 1, // ثلاثة عناصر في الشاشات الأكبر
      },
      940: {
        items: 1, // عنصر واحد للشاشات الكبيرة
      },
    },
    nav: false, // عدم عرض أزرار التنقل
  };

  secondSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    dots: false, // إظهار النقاط في الأسفل
    dotsData: false,
    autoplay: true, // تفعيل التشغيل التلقائي
    autoplayTimeout: 2000, // الوقت بين كل انتقال (3 ثوانٍ)
    dotsEach: false, // جعل النقاط لكل عنصر
    navText: ['', ''], // النص للأزرار
    responsive: {
      0: {
        items: 2, // عنصر واحد في الشاشات الصغيرة
      },
      400: {
        items: 2, // عنصرين في الشاشات المتوسطة
      },
      740: {
        items: 4, // ثلاثة عناصر في الشاشات الأكبر
      },
      940: {
        items: 4, // عنصر واحد للشاشات الكبيرة
      },
    },
    nav: false, // عدم عرض أزرار التنقل
  };
  feedback: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    rtl: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    dots: false, // إظهار النقاط في الأسفل
    dotsData: true,
    autoplay: true, // تفعيل التشغيل التلقائي
    autoplayTimeout: 5000, // الوقت بين كل انتقال (3 ثوانٍ)
    dotsEach: false, // جعل النقاط لكل عنصر
    navText: ['', ''], // النص للأزرار
    responsive: {
      0: {
        items: 1, // عنصر واحد في الشاشات الصغيرة
      },
      400: {
        items: 1, // عنصرين في الشاشات المتوسطة
      },
      740: {
        items: 1, // ثلاثة عناصر في الشاشات الأكبر
      },
      940: {
        items: 1, // عنصر واحد للشاشات الكبيرة
      },
    },
    nav: false, // عدم عرض أزرار التنقل
  };
}
