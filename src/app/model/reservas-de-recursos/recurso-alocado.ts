import {AbstractEntity} from '../abstract-entity';

import {TipoDeRecurso} from './tipo-de-recurso';

export class RecursoAlocado extends AbstractEntity {
  /**
   * Creates an instance of RecursoAlocado.
   * @param {TipoDeRecurso} [tipoDeRecurso] Tipo de recurso
   * @param {string} [identificador] Geralmente é o número da etiqueta que é colocada no
   *     equipamento. O conjunto (tipoDeRecurso.id + unidade + identificador) é sempre único
   * @param {RecursoStatus} [status] Status atual do recurso
   * @param {string} [unidade] Unidade onde está alocado o recurso (formato => GOIÂNIA:PERIMETRAL)
   * @param {string} [infoPopupHtml] Esse conteúdo é pra ser mostrado na tela em popups. São
   *     informações curtas. Aceita código HTML.
   * @param {string} [descricao] Informação mais detalhada sobre o recurso
   * @param {number} [lotacao] Quando o recurso alocado é do tipo espaço, registra a quantidade
   *     máxima de pessoas que cabem no local
   * @memberof RecursoAlocado
   */
  constructor(
    public tipoDeRecurso?: TipoDeRecurso,
    public identificador?: string,
    public status?: any,
    public unidade?: string,
    public descricao?: string,
    public infoPopupHtml?: string,
    public lotacao?: number,
  ) {
    super();

    this.tipoDeRecurso = tipoDeRecurso ? tipoDeRecurso : null;
    this.identificador = identificador ? identificador : '';
    this.status = status ? status : 'ATIVO';
    this.unidade = unidade ? unidade : null;
  }
}
