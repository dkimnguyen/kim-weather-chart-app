import { Component, OnInit, Input } from '@angular/core';
import { FormattedForecastData } from '../location/location';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.scss']
})
export class DayForecastComponent implements OnInit {
  @Input() forecast: FormattedForecastData;

  constructor() { }

  ngOnInit() {
  }

}
