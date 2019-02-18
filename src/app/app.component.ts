import {Component} from '@angular/core';

import {reservas as RESERVAS} from '../test-data/reservas';
import {RecursoAlocado, Reserva, TipoDeRecurso} from './model/reservas-de-recursos';
import {SolicitacaoAgendaRecurso} from './reservas-da-semana-por-recurso-alocado';

import * as moment from 'moment';
type Moment = moment.Moment;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'week-day-view';

  dataInicioSemana: Moment = moment()
    .month(0)
    .date(28);

  recursosAlocados: RecursoAlocado[];
  tiposDeRecurso: TipoDeRecurso[];

  reservas: Reserva[];

  todasReservas: Reserva[];

  constructor() {
    this.todasReservas = (RESERVAS as unknown) as Reserva[];

    this.todasReservas.forEach((r) => {
      r.dataFim = moment(r.dataFim);
      r.dataInicio = moment(r.dataInicio);
    });

    const tipos = {};
    const recursosAlocados = {};
    for (const r of this.todasReservas) {
      if (!tipos.hasOwnProperty(r.recursoAlocado.tipoDeRecurso.id)) {
        tipos[r.recursoAlocado.tipoDeRecurso.id] = r.recursoAlocado.tipoDeRecurso;
      }

      if (!recursosAlocados.hasOwnProperty(r.recursoAlocado.id)) {
        recursosAlocados[r.recursoAlocado.id] = r.recursoAlocado;
      }
    }
    this.recursosAlocados = Object.keys(recursosAlocados).map((id) => recursosAlocados[id]);
  }

  _obtemAgendaDeRecurso(evt: SolicitacaoAgendaRecurso) {
    this.reservas = this.todasReservas.filter(
      (r: Reserva) =>
        r.recursoAlocado.id === evt.recursoAlocadoId &&
        !r.dataInicio.isBefore(evt.inicioSemana) &&
        !r.dataInicio.isAfter(evt.fimSemana),
    );

    this.dataInicioSemana = evt.inicioSemana;
  }
}
