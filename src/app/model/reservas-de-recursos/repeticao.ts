import {AbstractEntity} from '../abstract-entity';

import * as moment from 'moment';
type Moment = moment.Moment;

export class Repeticao extends AbstractEntity {
  /**
   * Creates an instance of Repeticao.
   * @param {number} [intervaloEntreRepeticoes] Quantos dias existe entre uma repetição e outra.
   * @param {any} [tipoDeRepeticao] Unidade do intervalo de repetição (ex.: uma
   *     determinada reserva se repete a cada 4 dias, 4 semanas, 4 anos etc)
   * @param {any} [tipoDeTermino] Determina quando uma repetição termina (após um número
   *     fixo de ocorrências - REPETICOES - ou até que uma data seja atingida - DATA_LIMITE)
   * @param {number} [ocorrencias] Quando any for REPETICOES, este atributo contém o
   *     número de repetições até o final da série
   * @param {Moment} [dataTermino] Quando o any for DATA_LIMITE, este atributo contém a
   *     data em que a série termina
   * @param {Moment} [dataInicio] Data de início da série
   * @memberof Repeticao
   */
  constructor(
    public intervaloEntreRepeticoes?: number,
    public tipoDeRepeticao?: any,
    public tipoDeTermino?: any,
    public ocorrencias?: number,
    public dataTermino?: Moment,
    public dataInicio?: Moment,
  ) {
    super();

    // intervalo entre repetições, ou frequência das repetições
    if (!intervaloEntreRepeticoes) {
      this.intervaloEntreRepeticoes = 1;
    }

    // definição do período das repetições
    if (!tipoDeRepeticao) {
      this.tipoDeRepeticao = 'DIA';
    }

    // se a repetição foi definida por uma data de término ou por uma quantidade de repetições
    if (!tipoDeTermino) {
      this.tipoDeTermino = 'REPETICOES';
      this.ocorrencias = 1;
    }

    let mInicio: Moment;
    if (dataInicio) {
      mInicio = moment.utc(dataInicio);
    } else {
      mInicio = moment.utc();
      this.dataInicio = mInicio;
    }

    if (!dataTermino) {
      let periodoMoment = {};
      switch (this.tipoDeRepeticao) {
        case 'DIA':
          periodoMoment = {days: this.intervaloEntreRepeticoes};
          break;

        case 'SEMANA':
          periodoMoment = {weeks: this.intervaloEntreRepeticoes};
          break;

        case 'MES':
          periodoMoment = {months: this.intervaloEntreRepeticoes};
          break;

        case 'ANO':
          periodoMoment = {years: this.intervaloEntreRepeticoes};
          break;
      }
      this.dataTermino = mInicio.clone().add(moment.duration(periodoMoment));
    }
  }
}
