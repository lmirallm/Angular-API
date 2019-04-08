import { Component, OnInit } from '@angular/core';
import { Car } from './model/car';
import { DbService } from './db.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cars: any;
  constructor(private data: DbService) { }
  ngOnInit() {
    this.data.getCars().subscribe(data => { this.cars = data });
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
  
}


