import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GridSemanaComponent} from './grid-semana.component';

describe('WeekGridComponent', () => {
  let component: GridSemanaComponent;
  let fixture: ComponentFixture<GridSemanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridSemanaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
