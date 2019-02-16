import {AbstractEntity} from '../abstract-entity';
import {RecursoAlocado} from './recurso-alocado';
import {Repeticao} from './repeticao';

import {ReservaStatus, ReservaStatusOptions} from '../geral/definicoes-tipos.type';

import * as moment from 'moment';
import {TipoDeRecurso} from './tipo-de-recurso';
type Moment = moment.Moment;

export class ReservaEmEspera extends AbstractEntity {
  /**
   * Creates an instance of Reserva.
   * @param {string} appId app que fez a reserva
   * @param {Moment} [dataFim] Define data de Fim da Reserva
   * @param {Moment} [dataInicio] Define data de Inicio da Reserva
   * @param {string} [unidade] unidade da reserva
   * @param {ReservaStatus} [status] Define o Status da Reserva
   * @param {tipoDeRecurso} [tipoDeRecurso] Tipo de recurso a ser reservado
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
    public status?: ReservaStatus,
    public tipoDeRecurso?: TipoDeRecurso,
    public recursoAlocado?: RecursoAlocado,
    public observacao?: string,
    public repeticao?: Repeticao,
    public reservadoPara?: string,
    public local?: string,
    public reservadoPor?: string,
  ) {
    super();
  }
}
