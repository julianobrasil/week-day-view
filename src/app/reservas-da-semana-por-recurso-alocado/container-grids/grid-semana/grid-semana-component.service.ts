import {Injectable} from '@angular/core';

import {Reserva} from '../../../model/reservas-de-recursos';

import * as moment from 'moment';
type Moment = moment.Moment;

export interface InformacoesDaReserva {
  reserva: Reserva;
  deslocamentoVerfical: number;
  altura: number;
}

export interface InformacoesDoGrid {
  inicioDasReservasDoTurno: Moment;
  fimDasReservasDoTurno: Moment;

  reservasPorDia: Reserva[][];
}

@Injectable({
  providedIn: 'root',
})
export class GridSemanaComponentService {
  /** altura do grid de reservas */
  gridDeReservasHeight: number;

  /** largura da barra de rolagem */
  scrollBarWidth: string;

  /** constrói a matriz de reservas do dia */
  buildReservasPorDia(
    reservas: Reserva[],
    inicioDoDia: Moment,
    fimDoDia: Moment,
  ): InformacoesDaReserva[][] {
    if (!reservas || !reservas.length) {
      return [];
    }
    const reservasPorDia: InformacoesDaReserva[][] = [[], [], [], [], [], [], []];

    let inicioDasReservasDoTurno: Moment;
    let fimDasReservasDoTurno: Moment;
    for (const r of reservas) {
      r.dataInicio = moment(r.dataInicio);
      r.dataFim = moment(r.dataFim);

      if (!inicioDasReservasDoTurno || r.dataInicio.isBefore(inicioDasReservasDoTurno)) {
        inicioDasReservasDoTurno = r.dataInicio.clone();
      }

      if (!fimDasReservasDoTurno || r.dataFim.isAfter(fimDasReservasDoTurno)) {
        fimDasReservasDoTurno = r.dataFim.clone();
      }

      reservasPorDia[r.dataInicio.weekday()].push({
        reserva: r,
        deslocamentoVerfical: null,
        altura: null,
      });
    }

    for (const reservasDoDia of reservasPorDia) {
      reservasDoDia.sort((a, b) =>
        a.reserva.dataInicio.isBefore(b.reserva.dataInicio)
          ? -1
          : a.reserva.dataInicio.isAfter(b.reserva.dataInicio)
          ? 1
          : 0,
      );
      this._complementaInformacoesDaReserva(inicioDoDia, fimDoDia, reservasDoDia);
    }

    return reservasPorDia;
  }

  private _complementaInformacoesDaReserva(
    inicioDasReservasDoTurno: Moment,
    fimDasReservasDoTurno: Moment,
    reservasDoDia: InformacoesDaReserva[],
  ): void {
    if (!reservasDoDia || !reservasDoDia.length) {
      return;
    }

    inicioDasReservasDoTurno = inicioDasReservasDoTurno.clone().set({
      year: reservasDoDia[0].reserva.dataInicio.year(),
      month: reservasDoDia[0].reserva.dataInicio.month(),
      date: reservasDoDia[0].reserva.dataInicio.date(),
    });

    fimDasReservasDoTurno = fimDasReservasDoTurno.clone().set({
      year: reservasDoDia[0].reserva.dataInicio.year(),
      month: reservasDoDia[0].reserva.dataInicio.month(),
      date: reservasDoDia[0].reserva.dataInicio.date(),
    });

    const alturaMaxima: number =
      fimDasReservasDoTurno.toDate().getTime() - inicioDasReservasDoTurno.toDate().getTime();

    for (const info of reservasDoDia) {
      info.altura =
        (info.reserva.dataFim.toDate().getTime() - info.reserva.dataInicio.toDate().getTime()) /
        alturaMaxima;
      info.deslocamentoVerfical =
        (info.reserva.dataInicio.toDate().getTime() - inicioDasReservasDoTurno.toDate().getTime()) /
        alturaMaxima;
    }
  }
}
