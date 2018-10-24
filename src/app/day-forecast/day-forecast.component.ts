import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss']
})
export class DayForecastComponent implements OnInit {
  @Input() forecast: any;

  constructor() { }

  ngOnInit() {
    console.log(this.forecast);
  }

}
