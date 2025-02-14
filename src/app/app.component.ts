import { Component } from '@angular/core';
import { BlankComponent } from './components/blank/blank.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BlankComponent,
    FooterComponent,
    NavbarComponent,
    AdminLoginComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'vision';
}
