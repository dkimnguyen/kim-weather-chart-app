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
      let formattedForecastData = [];
      for (let forecast of data.list) {
        let formatted = this.formatForecastData(forecast);
        formattedForecastData.push(formatted);
      }
      this.forecasts = formattedForecastData;
    });
  }

  formatForecastData(forecast: any) {
    let weather = forecast.weather[0];
    return {
      minTemp: forecast.main.temp_min,
      maxTemp: forecast.main.temp_max,
      weather: weather.main,
      weatherDescription: weather.description,
      icon: weather.icon,
      date: forecast.dt_txt,
    };
  }

}

//if an error is thrown, display error message... pop up?