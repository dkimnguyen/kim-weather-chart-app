export class Location {
    location: string | number;
    country: string;
    data?: any;
}

export interface FormattedForecastData {
    minTemp: number;
    maxTemp: number;
    weather: string;
    weatherDescription: string;
    icon: string;
    date: Date;
}