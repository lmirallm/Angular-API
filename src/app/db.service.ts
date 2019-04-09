import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Car } from './model/Car';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'formacion/api/v1/cars';

  getCars() {
    return this.http.get<Car[]>(this.baseUrl);
  }

  getCarById(id: String) {
    return this.http.get<Car>(this.baseUrl + '/' + id);
  }

  createCar(car: Car) {

    return this.http.post(this.baseUrl, car);
  }

  updateCar(car: Car) {
    return this.http.put(this.baseUrl + '/' + car.id,car);
  }

  deleteCar(id: String) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}