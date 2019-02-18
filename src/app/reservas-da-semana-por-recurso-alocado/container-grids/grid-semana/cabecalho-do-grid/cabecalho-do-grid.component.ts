import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { of, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import * as moment from 'moment';
type Moment = moment.Moment;

// TODO(julianobrasil): colocar esta função no diretório de animações
export const pulse = animation(
  animate(
    '{{timing}}s {{delay}}s',
    keyframes([
      style({ transform: 'scale3d(1, 1, 1)' }),
      style({ transform: 'scale3d({{ scale }}, {{ scale }}, {{ scale }})' }),
      style({ transform: 'scale3d(1, 1, 1)' }),
    ]),
  ),
  { params: { scale: 1.1, timing: 0.5, delay: 0 } },
);

@Component({
  selector: 'app-cabecalho-do-grid',
  templateUrl: './cabecalho-do-grid.component.html',
  styleUrls: ['./cabecalho-do-grid.component.scss'],
  animations: [trigger('pulse', [transition('* => *', useAnimation(pulse))])],
})
export class CabecalhoDoGridComponent implements OnDestroy, OnInit {
  /** início da semana */
  private _inicioSemana: Moment;
  @Input()
  get inicioSemana(): Moment {
    return this._inicioSemana;
  }
  set inicioSemana(date: Moment) {
    if (date.isSame(this._inicioSemana)) {
      return;
    }
    date = date ? moment(date) : moment();
    date = date.weekday(0);
    date = date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    this._inicioSemana = date.clone();
    this._fimSemana = this._inicioSemana.clone().weekday(6);
  }

  /** componente desabilitado */
  @Input()
  disabled = false;

  /** emite a próxima semana a ser mostrada */
  @Output()
  inicioSemanaChange: EventEmitter<Moment> = new EventEmitter<Moment>();

  /** data de final da semana */
  _fimSemana: Moment;

  /** cliques do mouse (para evitar ir ao banco em cliques sucessivos e rápidos) */
  _debounceMouseClick$: Subject<MouseEvent> = new Subject<MouseEvent>();

  constructor(private _cd: ChangeDetectorRef) { }

  ngOnInit() {
    this._debounceMouseClick$
      .pipe(debounceTime(300))
      .subscribe((evt: Event) => this.inicioSemanaChange.emit(this.inicioSemana));
  }

  ngOnDestroy() {
    if (this._debounceMouseClick$ && !this._debounceMouseClick$.closed) {
      this._debounceMouseClick$.complete();
    }
  }

  /** emite a data da semana seguinte para ser mostrada */
  _solicitaSemanaSeguinte(evt: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.inicioSemana = this.inicioSemana.clone().weekday(7);

    this._debounceMouseClick$.next(evt);
  }

  /** emite a data da semana anterior para ser mostrada */
  _solicitaSemanaAnterior(evt: MouseEvent) {
    if (this.disabled) {
      return;
    }

    this.inicioSemana = this.inicioSemana.clone().weekday(-7);

    this._debounceMouseClick$.next(evt);
  }
}
