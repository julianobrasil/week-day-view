import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CabecalhoDoGridComponent} from './cabecalho-do-grid.component';

describe('WeekGridHeaderComponent', () => {
  let component: CabecalhoDoGridComponent;
  let fixture: ComponentFixture<CabecalhoDoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CabecalhoDoGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecalhoDoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
