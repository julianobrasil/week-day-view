import {AbstractEntity} from '../abstract-entity';

import {RecursoTipo, RecursoTipoOptions} from '../geral/definicoes-tipos.type';

export class TipoDeRecurso extends AbstractEntity {
  /** Aparece na tela quando for fazer reserva */
  nome = '';

  /** É espaço, equipamento ou recurso humano */
  tipo: RecursoTipo;

  /** Informação mais detalhada */
  descricao = ''; // não tenho certeza de que isso é preciso

  /** Esse conteúdo é pra ser mostrado na tela em popups. São informações curtas. */
  infoPopupHtml = '';

  constructor(
    nome?: string,
    descricao?: string,
    tipo?: RecursoTipo,
    infoPopupHtml?: string,
  ) {
    super();

    this.nome = nome ? nome : '';
    this.descricao = descricao ? descricao : '';
    this.tipo = tipo ? tipo : RecursoTipoOptions.EQUIPAMENTO;
    this.infoPopupHtml = infoPopupHtml ? infoPopupHtml : '';
  }
}
