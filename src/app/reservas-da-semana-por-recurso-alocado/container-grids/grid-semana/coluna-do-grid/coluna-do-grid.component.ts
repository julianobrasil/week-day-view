import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {InformacoesDaReserva} from '../grid-semana-component.service';

@Component({
  selector: 'app-coluna-do-grid',
  templateUrl: './coluna-do-grid.component.html',
  styleUrls: ['./coluna-do-grid.component.scss'],
})
export class ColunaDoGridComponent {
  /** número da coluna do grid (traz informação de qual dia da semana esta coluna se refere) */
  @Input()
  numeroDaColuna: number;

  /** informações das reservas representadas nesta coluna */
  @Input()
  informacoesDasReservasDoDia: InformacoesDaReserva[];
}
