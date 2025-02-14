import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, signal, Renderer2, viewChild, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdctsService } from '../../core/services/prodcts-service.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../core/pipes/truncate';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, TruncatePipe, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private prodctsService = inject(ProdctsService);
  private _ToastrService = inject(ToastrService);
  private _Renderer2 = inject(Renderer2)
  @ViewChild('inputElement') inputElement!: ElementRef;
  // Signals
  products = signal<Iproduct[]>([]);  // تحويل products إلى Signal
  selectedFile = signal<File | null>(null);  // الصورة الرئيسية كـ Signal
  selectedFiles = signal<File[]>([]);  // الصور الثانوية كـ Signal
  private subscriptions: Subscription = new Subscription();  // لإدارة الاشتراكات
  ngAfterViewInit() {
  }
  // إضافة المنتج
  addProduct(f: any) {
    const data: Iproduct = f.value;
  
    // تحقق من جميع الحقول المطلوبة
    if (data.name === '' || data.mainCatigory === undefined || data.subCatigory === undefined || data.Details === '') {
      this._ToastrService.info('Please fill all required fields.');
      return; // إنهاء الدالة إذا لم يتم استيفاء الشروط
    } else {
      // تحقق من أن الصورة (selectedFile) والصور الإضافية (selectedFiles) تم تحديدها
      if (this.selectedFile() && this.selectedFiles() && this.selectedFiles().length > 0) {
        this._Renderer2.addClass(this.inputElement.nativeElement, 'disabled');
        this.prodctsService.addProduct(data, this.selectedFile() as File, this.selectedFiles()).subscribe({
          next: (res) => {
            console.log('Product added:', res);
            this._ToastrService.success('Product added successfully!');
            this.resetForm(f); // إعادة تعيين النموذج بعد الإضافة
          },
          error: (err) => {
            console.error('Error adding product:', err);
            this._ToastrService.error('Failed to add product.');
          },
          complete: () => {
            // إعادة تمكين الزر بعد اكتمال العملية
            this._Renderer2.removeClass(this.inputElement.nativeElement, 'disabled');
          }
        });
      } else {
        this._ToastrService.info('All images renderedc!');
      }
    }
  }
  

  // تحميل المنتجات عند التهيئة
  ngOnInit(): void {
    const productsSub = this.prodctsService.getprodcts().subscribe((res) => {
      this.products.set(res);  // تعيين البيانات في الـ Signal
    });
    this.subscriptions.add(productsSub);  // إضافة الاشتراك للإدارة
  }

  // إزالة المنتج
  removeProduct(productId: string) {
    const removeSub = this.prodctsService.removeProduct(productId).subscribe((res) => {
      this.products.set(this.products().filter(p => p.id !== productId))
      this._ToastrService.success('Product removed successfully!');
    });
    this.subscriptions.add(removeSub);  // إضافة الاشتراك للإدارة
  }

  // تحديد الصورة الرئيسية
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);  // تعيين الصورة في الـ Signal
    }
  }

  // تحديد الصور الثانوية
  onFilesSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFiles.set(Array.from(files));  // تحويل FileList إلى Array وتعيينها في الـ Signal
    }else{
      this._ToastrService.info('Please select at least one image.');
    }
  }

  // إعادة تعيين النموذج
  resetForm(form: any): void {
    form.resetForm();  // إعادة تعيين النموذج ليصبح خاليًا
    this.selectedFile.set(null);  // إعادة تعيين الصورة الرئيسية
    this.selectedFiles.set([]);  // إعادة تعيين الصور الثانوية
  }

  // إلغاء الاشتراكات عند تدمير المكون
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();  // إلغاء جميع الاشتراكات لمنع تسرب الذاكرة
  }
}



 