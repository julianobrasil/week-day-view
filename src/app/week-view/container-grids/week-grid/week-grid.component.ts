import { Component, OnInit, Input } from '@angular/core';
import { Reserva } from '../../../model/reservas-de-recursos';

@Component({
  selector: 'app-week-grid',
  templateUrl: './week-grid.component.html',
  styleUrls: ['./week-grid.component.scss']
})
export class WeekGridComponent implements OnInit {

  private _reservas: Reserva[]
  @Input()
  get reservas(): Reserva[] { return this.reservas; }
  set reservas(reservas: Reserva[]){
    this._reservas = reservas;
  }

  constructor() { }

  ngOnInit() {
  }

}
