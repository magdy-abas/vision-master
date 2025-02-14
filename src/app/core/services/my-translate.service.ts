import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly _TranslateService = inject(TranslateService);
  isLeft: WritableSignal<boolean> = signal(true);

  constructor() {
    let lang = localStorage.getItem('lang'); // Get stored language
    this._TranslateService.setDefaultLang('en'); // Set default language as English

    // If a language is stored, use it
    if (lang !== null) {
      this._TranslateService.use(lang);
    }

    // Adjust the direction of the layout
    this.changeDirection();
  }

  // Method to change the direction of the layout (LTR/RTL) based on the language
  changeDirection(): void {
    let savedTranslations = localStorage.getItem('lang');
    if (savedTranslations === 'en') {
      document.documentElement.dir = 'ltr'; // Set direction to LTR
      this.isLeft.set(true); // Update signal to reflect LTR
    } else if (savedTranslations === 'ar') {
      document.documentElement.dir = 'rtl'; // Set direction to RTL
      this.isLeft.set(false); // Update signal to reflect RTL
    }
  }

  // Method to change the language and adjust direction accordingly
  changeLang(lang: string): void {
    localStorage.setItem('lang', lang); // Store the new language in localStorage
    this._TranslateService.use(lang); // Use the new language for translations
    this.changeDirection(); // Change direction after changing language
  }
}
