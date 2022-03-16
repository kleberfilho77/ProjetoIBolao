import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrobolaoComponent } from './cadastrobolao.component';

describe('CadastrobolaoComponent', () => {
  let component: CadastrobolaoComponent;
  let fixture: ComponentFixture<CadastrobolaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrobolaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrobolaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
