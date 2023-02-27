import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { WeatherService } from 'src/app/services/weather.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

const flagUrl = environment.flag_Url;
const conditionUrl = environment.condition_Url;
const apiUnsplash = environment.api_Unsplash;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private weatherData: any;

  errorMessage: any;
  cityInput: any;
  cityName: any;
  weatherTemp: any;
  weatherFeelsLike: any;
  weatherTempMax: any;
  weatherTempMin: any;
  weatherWind: any;
  weatherHumidity: any;
  weatherIcon: any;
  cityImg: any;
  flagIcon: any;

  todayDate = new Date();

  constructor(private weatherService: WeatherService) {}

  onClick(city: string) {
    var cityName = city;
    this.searchCity(cityName);
    this.errorMessage = '';
  }

  async searchCity(cityName: string) {
    this.weatherService.loadData(cityName).subscribe({
      next: (data) => {
        this.setData(data);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.errorMessage = 'Insira o nome de uma cidade';
        }
        if (error.status === 404) {
          this.errorMessage = 'Cidade não encontrada';
        }
        console.log(`Código: ${error.status} - ${this.errorMessage}`);
      },
    });
  }

  async setData(data: any) {
    this.weatherData = data;
    this.cityName = this.weatherData?.name;
    this.cityImg = `${apiUnsplash}${this.weatherData?.name}`;
    this.weatherTemp = (this.weatherData?.main.temp).toFixed(0);
    this.weatherTempMax = (this.weatherData?.main.temp_max).toFixed(0);
    this.weatherTempMin = (this.weatherData?.main.temp_min).toFixed(0);
    this.weatherHumidity = `${this.weatherData?.main.humidity}%`;
    this.weatherWind = `${this.weatherData?.wind.speed} Km/h`;
    this.weatherIcon = `${conditionUrl}${this.weatherData.weather[0].icon}@2x.png`;
    this.flagIcon = `${flagUrl}/${this.weatherData?.sys.country}`;
  }
}
