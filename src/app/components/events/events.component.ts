import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgwWowService } from 'ngx-wow';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit  {
  private readonly _NgwWowService =inject(NgwWowService)
ngOnInit(): void {
  this._NgwWowService.init()
}
}
