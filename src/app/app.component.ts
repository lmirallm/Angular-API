import { Component, OnInit, PipeTransform } from '@angular/core';
import { Car } from './model/car';
import { DbService } from './db.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  cars: any;
  cars$ : Observable<Car[]>;
  filter = new FormControl('');
  constructor( private pipe: DatePipe,private data: DbService) {
  
   }

  ngOnInit() {
    this.data.getCars().subscribe(data => { this.cars = data });
    this.orderCall();
  }
  selectedCar: Car = new Car();
  get() {
    this.data.getCars().subscribe(data => { this.cars = data });
  }
  add() {
    this.data.createCar(this.selectedCar).subscribe(data => { this.cars = data });
    this.selectedCar = new Car();
    this.get();
  }
  openForEdit(coche: Car) {
    this.selectedCar = coche;
  }
  delete() {
    this.data.deleteCar(this.selectedCar.id).subscribe(data => { this.cars = data })
    this.selectedCar = new Car();
    this.get();
  }
  update() {
    this.data.updateCar(this.selectedCar).subscribe(data => { this.cars = data })
    this.selectedCar = new Car();
    this.get();
  }

  orderCall(){
    this.cars$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.pipe))
    );
  }
  
  search(text: string, pipe: PipeTransform): Car[] {
    return this.cars.filter(car => {
      const term = text.toLowerCase();
      return pipe.transform(car.registration , 'short').toString().toLowerCase().includes(term)
          || car.brand.toLowerCase().includes(term);
    });
  }
}


