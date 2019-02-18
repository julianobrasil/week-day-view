import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

import {RecursoAlocado, Reserva, TipoDeRecurso} from '../../model/reservas-de-recursos';
import {SolicitacaoAgendaRecurso} from '../model';

import * as moment from 'moment';
import {GridSemanaComponentService} from './grid-semana/grid-semana-component.service';
type Moment = moment.Moment;

@Component({
  selector: 'app-week-view',
  templateUrl: './container-grids.component.html',
  styleUrls: ['./container-grids.component.scss'],
})
export class ContainerGridsComponent implements OnDestroy {
  /** componente desabilitado */
  @Input()
  disabled = false;

  /** início da semana */
  private _inicioSemana: Moment;
  @Input()
  get inicioSemana(): Moment {
    return this._inicioSemana;
  }
  set inicioSemana(date: Moment) {
    this._setupInicioSemana(date);
  }

  /** emite a próxima semana a ser mostrada */
  @Output()
  inicioSemanaChange: EventEmitter<Moment> = new EventEmitter<Moment>();

  /** reservas para serem mostradas */
  @Input()
  reservas: Reserva[];

  /** tipos de recursos disponíveis */
  @Input()
  tiposDeRecurso: TipoDeRecurso[];

  /** solicitação da agenda de um recurso */
  @Output()
  agendaDeRecursoSolicitada: EventEmitter<SolicitacaoAgendaRecurso> = new EventEmitter<
    SolicitacaoAgendaRecurso
  >();

  /** autocompletes e selects do topo */
  _form: FormGroup;

  /** data de final da semana */
  _fimSemana: Moment;

  /** início do dia a ser mostrado no grid */
  _inicioDoDia: Moment;

  /** fim do dia a ser mostrdo no grid */
  _fimDoDia: Moment;

  /** cancela as inscrições nos observables */
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(_fb: FormBuilder, _gridSemanaComponentService: GridSemanaComponentService) {
    this._form = _fb.group({
      recursoAlocado: [null, Validators.required],
    });

    this._form
      .get('recursoAlocado')
      .valueChanges.pipe(
        debounceTime(500),
        takeUntil(this._destroy$),
      )
      .subscribe((r: RecursoAlocado | null) => this._recursoAlocadoChanged(r));

    this._inicioDoDia = moment().set({hour: 7});

    _gridSemanaComponentService.scrollBarWidth = this._obtemLarguraDoScrollbar() - 2 + 'px';

    _gridSemanaComponentService.gridDeReservasHeight = 1000;
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  /** trata evento de recurso alocado alterado */
  _recursoAlocadoChanged(r: RecursoAlocado): void {
    if (!this._inicioSemana) {
      this.inicioSemana = null;
    }
    this.agendaDeRecursoSolicitada.emit(
      r
        ? {
            recursoAlocadoId: typeof r === 'string' ? +r : r.id,
            inicioSemana: this._inicioSemana,
            fimSemana: this._fimSemana,
          }
        : null,
    );
  }

  /** trata alteração de data de início */
  _trataAlteracaoDaDataDeInicio(novaData: Moment) {
    const r: RecursoAlocado | string = this._form.value.recursoAlocado;

    this._setupInicioSemana(novaData);

    const inicioSemana: Moment = novaData
      .set({hour: 0, minute: 0, second: 0, millisecond: 0})
      .weekday(0);
    const fimSemana: Moment = inicioSemana.clone().weekday(6);

    this.agendaDeRecursoSolicitada.emit(
      r
        ? {
            recursoAlocadoId: typeof r === 'string' ? +r : r.id,
            inicioSemana,
            fimSemana,
          }
        : null,
    );
  }

  /** configura o início da semana corretamente */
  private _setupInicioSemana(date: Moment) {
    date = date ? moment(date) : moment();
    date = date.weekday(0);
    date = date.set({hour: 0, minute: 0, second: 0, millisecond: 0});
    this._inicioSemana = date.clone();
    this._fimSemana = this._inicioSemana.clone().weekday(6);
  }

  /** obtém a largura do scrollbar */
  private _obtemLarguraDoScrollbar() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }
}
