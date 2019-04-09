import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Car } from './model/Car';

//const endpoint = 'http://localhost:8080/formacion/api/v1/';
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
    return this.http.get<Car>(this.baseUrl,httpOptions);
  }

  getCarById(id: String) {
    return this.http.get<Car>(this.baseUrl + '/' + id,httpOptions);
  }

  createCar(car: Car) {
    console.log(car);
    return this.http.post(this.baseUrl, car);
  }

  updateCar(car: Car) {
    return this.http.put(this.baseUrl + '/' + car.id,car);
  }

  deleteCar(id: String) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}


/*
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getCars(){
    const url = `${this.apiUrl}`;
    return this.http.get<Car>(url).pipe(
      tap(_ => console.log(`gotten Car`)),
      catchError(this.handleError<Car>(`getCar`))
    );
  }
  
  getCar(id: String): Observable<Car> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(url, httpOptions).pipe(
      tap(_ => console.log(`gotten Car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }
  
  createCar (Car): Observable<Car> {
    return this.http.post(this.apiUrl, Car, httpOptions).pipe(
      tap((Car: Car) => console.log(`added Car w/ id=${Car.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }
  
  updateCar (Car): Observable<any> {
    const url = `${this.apiUrl}/${Car.id}`;
    return this.http.put(url, Car, httpOptions).pipe(
      tap(_ => console.log(`updated Car id=${Car.id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }
  
  deleteCar (id : String): Observable<Car> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Car>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Car id=${id}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );
    }
}*/

