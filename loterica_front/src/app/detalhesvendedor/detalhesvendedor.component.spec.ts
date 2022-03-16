import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesvendedorComponent } from './detalhesvendedor.component';

describe('DetalhesvendedorComponent', () => {
  let component: DetalhesvendedorComponent;
  let fixture: ComponentFixture<DetalhesvendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesvendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesvendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
