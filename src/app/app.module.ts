// tslint:disable:max-line-length
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ReservasDaSemanaPorRecursoAlocadoModule} from './reservas-da-semana-por-recurso-alocado/reservas-da-semana-por-recurso-alocado.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ReservasDaSemanaPorRecursoAlocadoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
