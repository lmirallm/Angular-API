import { Component, OnInit, PipeTransform } from '@angular/core';
import { Car } from './model/car';
import { DbService } from './db.service';
import { DecimalPipe, DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DecimalPipe]
})
export class AppComponent implements OnInit {
  cars: any;
  cars$ : any;
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
  
  search(text: String, pipe: PipeTransform): Car[] {
    return this.cars.filter(car => {
      const term = text.toLowerCase();
      return pipe.transform(car.registration).includes(term)
          || pipe.transform(car.brand).includes(term);
    });
  }
}


