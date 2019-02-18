import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

import {combineLatest, Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

import {GridSemanaComponentService, InformacoesDaReserva} from './grid-semana-component.service';

import {Reserva} from '../../../model/reservas-de-recursos';

import * as moment from 'moment';
type Moment = moment.Moment;

@Component({
  selector: 'app-grid-semana',
  templateUrl: './grid-semana.component.html',
  styleUrls: ['./grid-semana.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridSemanaComponent implements AfterViewInit, OnDestroy {
  /** componente desabilitado */
  @Input()
  disabled = false;

  /** mostra o domingo */
  @Input()
  mostraDomingo = false;

  /** início da semana */
  private _inicioSemana: Moment;
  @Input()
  get inicioSemana(): Moment {
    return this._inicioSemana;
  }
  set inicioSemana(date: Moment) {
    date = date ? moment(date) : moment();
    date = date.weekday(0);
    date = date.set({hour: 0, minute: 0, second: 0, millisecond: 0});
    this._inicioSemana = date.clone();
  }

  /** emite a próxima semana a ser mostrada */
  @Output()
  inicioSemanaChange: EventEmitter<Moment> = new EventEmitter<Moment>();

  /** reservas por dia da semana */
  private _reservas$: Subject<Reserva[]> = new Subject<Reserva[]>();
  private _reservas: Reserva[];
  @Input()
  get reservas(): Reserva[] {
    return this.reservas;
  }
  set reservas(reservas: Reserva[]) {
    this._reservas = reservas;

    this._reservas$.next(this._reservas);
  }

  /** primeiro horário representado no dia */
  private _inicioDoDia$: Subject<Moment> = new Subject<Moment>();
  private _inicioDoDia: Moment;
  @Input()
  get inicioDoDia(): Moment {
    return this._inicioDoDia;
  }
  set inicioDoDia(date: Moment) {
    date = date ? moment(date) : moment();
    date = date.weekday(0);
    this._inicioDoDia = date.clone();
    this._inicioDoDia$.next(this._inicioDoDia);
  }

  /** último horário representado no dia */
  private _fimDoDia$: Subject<Moment> = new Subject<Moment>();
  private _fimDoDia: Moment;
  @Input()
  get fimDoDia(): Moment {
    return this._fimDoDia;
  }
  set fimDoDia(date: Moment) {
    date = date ? moment(date) : moment().set({hour: 23, minute: 59, second: 59, millisecond: 0});
    date = date.weekday(0);
    this._fimDoDia = date.clone();
    this._fimDoDia$.next(this._fimDoDia);
  }

  /** corpo da tabela de horários */
  @ViewChild('bodyWrapper') _divBodyWrapper: ElementRef;

  /** reservas agrupadas por dia da semana e em ordem crescente */
  informacoesDasReservasPorDia: InformacoesDaReserva[][];

  /** cancela as inscrições nos observables */
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    public _componentService: GridSemanaComponentService,
    private _cd: ChangeDetectorRef,
  ) {
    combineLatest(
      this._reservas$.pipe(debounceTime(500)),
      this._inicioDoDia$.pipe(debounceTime(500)),
      this._fimDoDia$.pipe(debounceTime(500)),
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe(([reservas, inicioDoDia, fimDoDia]) => {
        this.informacoesDasReservasPorDia = this._componentService.buildReservasPorDia(
          reservas,
          inicioDoDia,
          fimDoDia,
        );

        setTimeout(() => this._ajustaAlturaDoWrapperDoCorpo());

        this._cd.markForCheck();
      });
  }

  ngAfterViewInit() {
    this._ajustaAlturaDoWrapperDoCorpo();
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  /** mostra ou não o domingo */
  _mostraColuna(indiceDaColuna: number) {
    if (indiceDaColuna === 0 && !this.mostraDomingo) {
      return false;
    }

    return true;
  }

  /** depois que a div é inicializada, calcula o tamanho da janela e ajusta a área visível */
  private _ajustaAlturaDoWrapperDoCorpo() {
    if (!this._divBodyWrapper) {
      return;
    }

    const div: HTMLDivElement = this._divBodyWrapper.nativeElement;

    // informações sobre a div do corpo
    const rect: ClientRect | DOMRect = div.getBoundingClientRect();

    // tamanho da janela
    const documentHeight = document.documentElement.clientHeight;

    // altura abaixo da barra de título, até a parte de baixo da área visível
    const height = documentHeight - rect.top;

    div.style.height = `${height}px`;
  }
}
