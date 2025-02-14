import { NgClass } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  private readonly _MyTranslateService = inject(MyTranslateService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.isadminCheck();
  }

  change(lang: string): void {
    this._MyTranslateService.changeLang(lang);
  }

  isScrolled = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = document.documentElement.scrollTop;
    this.isScrolled = scrollOffset > 25;
  }

  isadminCheck() {
    const adminStatus = localStorage.getItem('admin');
    this.isAdmin = adminStatus === 'true';
  }
}
