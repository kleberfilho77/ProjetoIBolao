import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioclientefinalComponent } from './usuarioclientefinal.component';

describe('UsuarioclientefinalComponent', () => {
  let component: UsuarioclientefinalComponent;
  let fixture: ComponentFixture<UsuarioclientefinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioclientefinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioclientefinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
