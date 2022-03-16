import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioequipeadminComponent } from './usuarioequipeadmin.component';

describe('UsuarioequipeadminComponent', () => {
  let component: UsuarioequipeadminComponent;
  let fixture: ComponentFixture<UsuarioequipeadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioequipeadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioequipeadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
