import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContainerGridsComponent} from './container-grids.component';

describe('ContainerGridsComponent', () => {
  let component: ContainerGridsComponent;
  let fixture: ComponentFixture<ContainerGridsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerGridsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
