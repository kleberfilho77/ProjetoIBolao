import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesbolaoComponent } from './detalhesbolao.component';

describe('DetalhesbolaoComponent', () => {
  let component: DetalhesbolaoComponent;
  let fixture: ComponentFixture<DetalhesbolaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesbolaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesbolaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
