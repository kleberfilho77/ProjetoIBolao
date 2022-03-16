import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioequipevendedorComponent } from './usuarioequipevendedor.component';

describe('UsuarioequipevendedorComponent', () => {
  let component: UsuarioequipevendedorComponent;
  let fixture: ComponentFixture<UsuarioequipevendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioequipevendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioequipevendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
