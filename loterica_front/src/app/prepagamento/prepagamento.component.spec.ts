import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepagamentoComponent } from './prepagamento.component';

describe('PrepagamentoComponent', () => {
  let component: PrepagamentoComponent;
  let fixture: ComponentFixture<PrepagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
