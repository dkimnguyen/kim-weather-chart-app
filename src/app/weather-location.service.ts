import { Injectable } from '@angular/core';
import { Location, FormattedForecastData } from './location/location'
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {

  //todo create cache store

  weatherApi = 'api.openweathermap.org/data/2.5/forecast';
  appId = '&appid=d61ed55b0e5a134db9b88f48e9f3f89d';
  count = '&cnt=5';
  unit = '&units=imperial'

  constructor(private http: HttpClient) { 
  }

  getForcast(location: Location): Observable<any> {
    //todo check cache store and if key of city or zip code is found, return that data
    return this.http.get(this.buildForecastUrl(location))
      .pipe(
        map(this.formatForecastData),
        catchError(this.handleError('getForecast', [])));
  }

  buildForecastUrl(location: Location): string {
    let query;
    if(+location.location) {
      query = 'zip';
    } else {
      query = 'q';
    }
    return`http://${this.weatherApi}?${query}=${location.location},${location.country}${this.appId}${this.unit}`;
  }

  handleError(error: string, result: any) {
    return (error: any): Observable<any> => {
      console.error(error);
      return of(result as any);
    };
  }

  formatForecastData(data: any): { city: string, forecasts: FormattedForecastData[]} {
    let formattedForecastData = [];
    let city = data.city.name;  
    for (let forecast of data.list) {
      let weather = forecast.weather[0];
      let formatted = {
        minTemp: forecast.main.temp_min,
        maxTemp: forecast.main.temp_max,
        weather: weather.main,
        weatherDescription: weather.description,
        icon: weather.icon,
        date: new Date(forecast.dt_txt),
      };
      formattedForecastData.push(formatted);
    }
    //todo set mapped data into cache by city name
    //todo set mapped data into cache by zip code
    return {
      city: city,
      forecasts: formattedForecastData
    };
  }

}