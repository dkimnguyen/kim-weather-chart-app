import { Component, OnInit } from '@angular/core';
import { Location } from '../location/location';
import { WeatherLocationService } from '../weather-location.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {
  defaultCountry = 'us';
  location: Location = {
    location: '',
    country: ''
  };
  forecasts: any;
  
  constructor(private weatherService: WeatherLocationService) { }

  ngOnInit() {
  }

  validateLocation(location) {
    if (location.country === '') {
      location.country = this.defaultCountry;
    }
    this.weatherService.getForcast(location).subscribe((data) => {
      console.log(data);
      this.forecasts = data.list;
    });
  }
}

//if an error is thrown, display error message... pop up?