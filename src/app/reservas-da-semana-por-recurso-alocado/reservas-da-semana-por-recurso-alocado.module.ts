// tslint:disable:max-line-length
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';

import {ContainerGridsComponent} from './container-grids/container-grids.component';
import {CabecalhoDoGridComponent} from './container-grids/grid-semana/cabecalho-do-grid/cabecalho-do-grid.component';
import {CelulaDeReservaDoGridComponent} from './container-grids/grid-semana/coluna-do-grid/celula-de-reserva-do-grid/celula-de-reserva-do-grid.component';
import {ColunaDoGridComponent} from './container-grids/grid-semana/coluna-do-grid/coluna-do-grid.component';
import {GridSemanaComponent} from './container-grids/grid-semana/grid-semana.component';

/** PIPES */
import {WeekdayNumber2TextPipe} from './container-grids/grid-semana/coluna-do-grid/pipes/weekday-number-2-text.pipe';

@NgModule({
  declarations: [
    ContainerGridsComponent,
    ColunaDoGridComponent,
    GridSemanaComponent,
    CabecalhoDoGridComponent,
    WeekdayNumber2TextPipe,
    CelulaDeReservaDoGridComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
  ],
  exports: [ContainerGridsComponent],
})
export class ReservasDaSemanaPorRecursoAlocadoModule {}
