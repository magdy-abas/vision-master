import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  showLoginForm = false;
  email: string = '';
  password: string = '';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() === 'y') {
      this.showLoginForm = true;
    }
  }

  closeLoginForm() {
    this.showLoginForm = false;
  }

  onSubmit() {
    if (this.email === 'yousef' && this.password === '123') {
      this.toastrService.success('Login successful');
      sessionStorage.setItem('admin', 'true'); // Using sessionStorage instead of localStorage
      this.router.navigate(['/dashboard']);
      this.closeLoginForm();
    } else {
      this.toastrService.error('Invalid email or password');
    }
  }
}
