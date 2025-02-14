import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [NgClass, TranslateModule],
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  lang: string = localStorage.getItem('lang')!;
  isLeft: boolean = true
  constructor(private wowService: NgwWowService) { }

  ngOnInit() {
    if (this.lang === 'en') {
      this.isLeft = true
    } else {
      this.isLeft = false
    }
    this.wowService.init();


  }

}
