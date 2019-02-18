import {AbstractEntity} from '../abstract-entity';
import {RecursoAlocado} from './recurso-alocado';
import {Repeticao} from './repeticao';

import * as moment from 'moment';
type Moment = moment.Moment;

export class Reserva extends AbstractEntity {
  /**
   * Creates an instance of Reserva.
   * @param {string} appId app que fez a reserva
   * @param {Moment} [dataFim] Define data de Fim da Reserva
   * @param {Moment} [dataInicio] Define data de Inicio da Reserva
   * @param {string} [unidade] unidade da reserva
   * @param {ReservaStatus} [status] Define o Status da Reserva
   * @param {RecursoAlocado} [recursoAlocado] RecursoAlocado a ser reservado
   * @param {string} [observacao] Define Uma observação para esta Reserva
   * @param {Repeticao} [repeticao] Define uma repeticao para esta Reserva
   * @param {string} [reservadoPara] Define um usuario (e-mail) como Destinatario da Reserva
   * @param {string} [local] local onde será usado o recurso
   * @param {string} [criadoPor] email da pessoa que criou o registro
   * @memberof Reserva
   */
  constructor(
    public appId?: string,
    public dataFim?: Moment,
    public dataInicio?: Moment,
    public unidade?: string,
    public status?: any,
    public recursoAlocado?: RecursoAlocado,
    public observacao?: string,
    public repeticao?: Repeticao,
    public reservadoPara?: string,
    public local?: string,
    public reservadoPor?: string,
  ) {
    super();

    /** Define data de Inicio da Reserva */
    let mInicio: Moment;
    if (dataInicio) {
      mInicio = moment.utc(dataInicio);
    } else {
      // Caso não possua data de Inicio pega-se a de Hoje
      mInicio = moment.utc();
      this.dataInicio = mInicio;
    }

    /** Define data de Fim da Reserva */
    if (dataFim) {
      this.dataFim = moment.utc(dataFim);
    } else {
      // Define como Data fim 1 dia depois da Data de Inicio
      const periodoMoment = {days: 1};
      this.dataInicio = mInicio.clone().add(moment.duration(periodoMoment));
    }

    /** Define Local da Reserva */
    if (!unidade) {
      this.unidade = '';
    }

    /** Define o Status da Reserva */
    if (!status) {
      this.status = 'APROVADA';
    }

    /** Define um usuario como Destinatario da Reserva */
    if (!reservadoPara) {
      this.reservadoPara = '';
    }

    /** Define Uma observação para esta Reserva */
    if (!observacao) {
      this.observacao = '';
    }

    /** Define uma repeticao para esta Reserva */
    if (!repeticao) {
      this.repeticao = new Repeticao();
    }
  }
}
