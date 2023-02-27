import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError, throwError } from 'rxjs';

const apiUrl = environment.api_Url;
const apiKey = environment.api_Key;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  errorMessage: any;

  constructor(private httpClient: HttpClient) {}

  loadData(cityName: string) {
    return this.httpClient.get(
      `${apiUrl}/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
  }
}
