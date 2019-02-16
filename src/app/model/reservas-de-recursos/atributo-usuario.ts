import {AbstractEntity} from '../abstract-entity';
import {Atributo} from './atributo';
import {RecursoAlocado} from './recurso-alocado';
import {TipoDeRecurso} from './tipo-de-recurso';

export class AtributoUsuario extends AbstractEntity {
  /**
   * Create a instance of AtributoUsuario.
   *
   * @param tipoDeRecurso instância de um tipo de recurso
   * @param tipoDeRecurso instância de um recurso alocado
   * @param unidade unidade onde o usuário tem poderes para quebrar a restrição imposta pelo valor
   *     de atributo de qualquer recurso
   * @param usuarioEmail
   *            identificador do usuário ao qual vai ser concedida a exceção para o atributo
   */
  constructor(
    public tipoDeRecurso?: TipoDeRecurso,
    public recursoAlocado?: RecursoAlocado,
    public unidade?: string,
    public usuarioEmail?: string,
    public atributo?: Atributo,
  ) {
    super();
  }
}
