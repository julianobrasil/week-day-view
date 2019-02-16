import * as moment from 'moment';
type Moment = moment.Moment;

export abstract class AbstractEntity {
  constructor(
    public id?: number,
    public version?: number,
    public creationDate?: Moment,
    public createdBy?: string,
    public lasModifiedDate?: Moment,
    public lasModifiedBy?: string) {
    this.version = version ? version : 0;
    this.creationDate = creationDate ? creationDate : moment.utc();
    this.createdBy = createdBy ? createdBy : '';
    this.lasModifiedDate = lasModifiedDate ? lasModifiedDate : moment.utc(this.creationDate);
    this.lasModifiedBy = lasModifiedBy ? lasModifiedBy : '';
  }
}
