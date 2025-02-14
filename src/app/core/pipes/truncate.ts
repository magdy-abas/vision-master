import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, wordLimit: number ): string {
    if (!value) return '';

    // تقطيع الجملة إلى كلمات باستخدام الفراغ كفاصل
    const words = value.split(' ');

    // إذا كانت الجملة أقل من عدد الكلمات المطلوب، قم بإعادتها كما هي
    if (words.length <= wordLimit) {
      return value;
    }

    // الحصول على أول wordLimit كلمة ودمجها لتكوين الجملة النهائية
    const truncatedWords = words.slice(0, wordLimit).join(' ');

    return truncatedWords + '...';  // إضافة "..." لبيان أن الجملة مق
  }
}