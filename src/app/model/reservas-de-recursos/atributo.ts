import {AbstractEntity} from '../abstract-entity';

export class Atributo extends AbstractEntity {
  /**
   * Create a instance of Atributo
   * @param {string} nome nome do atributo
   * @param {string} codigo código de identificação
   * @param {string} parametros array com JSONs que definem os parâmetros a serem recebidos por um
   *     atributo
   * ao relaciona-lo com um RecursoAlocado ou TipoDeRecurso
   */
  constructor(public nome?: string, public codigo?: string, public parametros?: string) {
    super();
  }
}
