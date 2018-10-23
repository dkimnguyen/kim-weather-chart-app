import { Injectable } from '@angular/core';
import { Location } from './location/location'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
    return this.http.get(this.buildForecastUrl(location));
  }

  buildForecastUrl(location: Location): string {
    let query;
    if(+location.location) {
      query = 'zip';
    } else {
      query = 'q';
    }
    return`http://${this.weatherApi}?${query}=${location.location},${location.country}${this.appId}${this.count}${this.unit}`;
  }

}

//store successful api gets in a dictionary

//function to check the cache if the location was already called