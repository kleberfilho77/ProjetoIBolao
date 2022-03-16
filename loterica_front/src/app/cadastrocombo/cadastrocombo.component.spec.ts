import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrocomboComponent } from './cadastrocombo.component';

describe('CadastrocomboComponent', () => {
  let component: CadastrocomboComponent;
  let fixture: ComponentFixture<CadastrocomboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrocomboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrocomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
