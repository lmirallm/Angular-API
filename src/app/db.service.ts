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
    return this.http.get<Car>(this.baseUrl);
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
    return this.http.get(apiUrl);
  }
  
  getCar(id: String): Observable<Car> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      tap(_ => console.log(`fetched Car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }
  
  addCar (Car): Observable<Car> {
    return this.http.post(apiUrl, Car, httpOptions).pipe(
      tap((Car: Car) => console.log(`added Car w/ id=${Car.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }
  
  updateCar (id, Car): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Car, httpOptions).pipe(
      tap(_ => console.log(`updated Car id=${id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }
  
  deleteCar (id : String): Observable<Car> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Car>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Car id=${id}`)),
      catchError(this.handleError<Car>('deleteCar'))
    );
  }*/
 
}
