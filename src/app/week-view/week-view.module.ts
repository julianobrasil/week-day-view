import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerGridsComponent } from './container-grids/container-grids.component';
import { WeekGridComponent } from './container-grids/week-grid/week-grid.component';
import { DayColumnComponent } from './container-grids/week-grid/day-column/day-column.component';

@NgModule({
  declarations: [ContainerGridsComponent, WeekGridComponent, DayColumnComponent],
  imports: [
    CommonModule
  ],
  exports: [ContainerGridsComponent],
})
export class WeekViewModule { }
