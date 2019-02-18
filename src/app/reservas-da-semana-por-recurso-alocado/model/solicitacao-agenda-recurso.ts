import * as moment from 'moment';
type Moment = moment.Moment;

export interface SolicitacaoAgendaRecurso {
  recursoAlocadoId: number;
  inicioSemana: Moment;
  fimSemana: Moment;
}
