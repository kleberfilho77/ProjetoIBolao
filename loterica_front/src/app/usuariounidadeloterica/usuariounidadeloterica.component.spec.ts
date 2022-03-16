import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariounidadelotericaComponent } from './usuariounidadeloterica.component';

describe('UsuariounidadelotericaComponent', () => {
  let component: UsuariounidadelotericaComponent;
  let fixture: ComponentFixture<UsuariounidadelotericaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariounidadelotericaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariounidadelotericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
