import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ColunaDoGridComponent} from './coluna-do-grid.component';

describe('WeekGridColumnComponent', () => {
  let component: ColunaDoGridComponent;
  let fixture: ComponentFixture<ColunaDoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColunaDoGridComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColunaDoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
