import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesadministradorComponent } from './detalhesadministrador.component';

describe('DetalhesadministradorComponent', () => {
  let component: DetalhesadministradorComponent;
  let fixture: ComponentFixture<DetalhesadministradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesadministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
