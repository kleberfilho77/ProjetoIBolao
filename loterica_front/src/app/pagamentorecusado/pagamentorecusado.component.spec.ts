import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentorecusadoComponent } from './pagamentorecusado.component';

describe('PagamentorecusadoComponent', () => {
  let component: PagamentorecusadoComponent;
  let fixture: ComponentFixture<PagamentorecusadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentorecusadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentorecusadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
