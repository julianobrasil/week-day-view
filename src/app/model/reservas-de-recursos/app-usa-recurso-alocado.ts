import {AbstractEntity} from '../abstract-entity';
import {RecursoAlocado} from './recurso-alocado';

export class AppUsaRecursoAlocado extends AbstractEntity {
  constructor(
    public app?: string,
    public appID?: string,
    public recursoAlocado?: RecursoAlocado,
  ) {
    super();
    this.app = app ? app : '';
    this.appID = appID ? appID : '';
    this.recursoAlocado = recursoAlocado ? recursoAlocado : new RecursoAlocado();
  }
}
