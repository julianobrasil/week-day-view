import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {
  GridSemanaComponentService,
  InformacoesDaReserva,
} from '../../grid-semana-component.service';

@Component({
  selector: 'app-celula-de-reserva-do-grid',
  templateUrl: './celula-de-reserva-do-grid.component.html',
  styleUrls: ['./celula-de-reserva-do-grid.component.scss'],
})
export class CelulaDeReservaDoGridComponent implements OnInit {
  /** reserva que está sendo representada nesta célula */
  @Input()
  informacoesDaReserva: InformacoesDaReserva;

  @ViewChild('div') _div: ElementRef;

  constructor(
    private _gridSemanaComponentService: GridSemanaComponentService,
  ) {}

  ngOnInit() {}

  /** posiciona a célula corretamente */
  get _cellStyle(): {[key: string]: string} {
    if (!this.informacoesDaReserva) {
      return {};
    }

    return {
      position: 'absolute',
      top:
        this.informacoesDaReserva.deslocamentoVerfical *
          this._gridSemanaComponentService.gridDeReservasHeight +
        'px',
      height:
        this.informacoesDaReserva.altura * this._gridSemanaComponentService.gridDeReservasHeight +
        'px',
      width: 'calc(100% - 4px)',
    };
  }
}
