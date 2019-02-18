import {AbstractEntity} from '../abstract-entity';

export class TipoDeRecurso extends AbstractEntity {
  /** Aparece na tela quando for fazer reserva */
  nome = '';

  /** É espaço, equipamento ou recurso humano */
  tipo: any;

  /** Informação mais detalhada */
  descricao = ''; // não tenho certeza de que isso é preciso

  /** Esse conteúdo é pra ser mostrado na tela em popups. São informações curtas. */
  infoPopupHtml = '';

  constructor(
    nome?: string,
    descricao?: string,
    tipo?: any,
    infoPopupHtml?: string,
  ) {
    super();

    this.nome = nome ? nome : '';
    this.descricao = descricao ? descricao : '';
    this.tipo = tipo ? tipo : 'EQUIPAMENTO';
    this.infoPopupHtml = infoPopupHtml ? infoPopupHtml : '';
  }
}
