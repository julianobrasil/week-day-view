import {AbstractEntity} from '../abstract-entity';
import {AtributoRecurso} from './atributo-recurso';

export class AtributoParametro extends AbstractEntity {
  /**
   *
   * @param {string} [codigo] string contendo o código do atributo
   * @param {AtributoParametroType} [tipo] enum que define o tipo de dado do parâmetro
   * @param {string} [descricao] string que descreve o parâmetro
   * @param {string} [unidadeMedida] tipo de unidade de medida usada na tela (faz
   *       sentido em alguns casos e em outros, não)
   * @param {string} [stringValue] valor do tipo string do parâmetro
   * @param {number} [numberValue] valor do tipo number do parâmetro
   * @param {AtributoRecurso} [atributoRecurso] instância de AtributoRecurso ao qual o parâmetro
   * é vinculado
   */
  constructor(
    public codigo?: string,
    public tipo?: any,
    public descricao?: string,
    public unidadeMedida?: string,
    public stringValue?: string,
    public numberValue?: number,
    public atributoRecurso?: AtributoRecurso,
  ) {
    super();
  }
}
