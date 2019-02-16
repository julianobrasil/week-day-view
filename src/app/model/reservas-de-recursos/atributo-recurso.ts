import {AbstractEntity} from '../abstract-entity';
import {Atributo} from './atributo';
import {AtributoParametro} from './atributo-parametro';
import {RecursoAlocado} from './recurso-alocado';
import {TipoDeRecurso} from './tipo-de-recurso';

export class AtributoRecurso extends AbstractEntity {
  /**
   * Creates a instance of AtributoRecurso
   *
   * @param {TipoDeRecurso} [tipoDeRecurso] instância de TipoDeRecurso
   * @param {RecursoAlocado} [recursoAlocado] instância de RecursoAlocado
   * @param {Atributo} [atributo] instância de Atributo que possui a relação
   * @param {string} [unidade] unidade onde o atributo está aplicado quando for aplicado a um
   *     tipoDeRecurso ao invés de a um recursoAlocado
   * @param {AtributoParametro[]} [atributosParametros] array com os parâmetros de um atributo
   */
  constructor(
    public tipoDeRecurso?: TipoDeRecurso,
    public recursoAlocado?: RecursoAlocado,
    public atributo?: Atributo,
    public unidade?: string,
  ) {
    super();
  }
}
