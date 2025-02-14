import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const dashGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // تحقق مما إذا كانت قيمة 'admin' موجودة في localStorage
  const isAdmin = localStorage.getItem('admin') === 'true';
  if (isAdmin) {
    return true;
  } else {
    // إذا لم يكن المستخدم مسؤولاً، توجيههم إلى الصفحة الرئيسية
    router.navigate(['/home']);
    return false;
  }
};
