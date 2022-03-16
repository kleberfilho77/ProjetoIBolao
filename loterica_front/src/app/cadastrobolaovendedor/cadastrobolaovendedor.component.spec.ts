import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrobolaovendedorComponent } from './cadastrobolaovendedor.component';

describe('CadastrobolaovendedorComponent', () => {
  let component: CadastrobolaovendedorComponent;
  let fixture: ComponentFixture<CadastrobolaovendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrobolaovendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrobolaovendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
