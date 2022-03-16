import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhescomboComponent } from './detalhescombo.component';

describe('DetalhescomboComponent', () => {
  let component: DetalhescomboComponent;
  let fixture: ComponentFixture<DetalhescomboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhescomboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhescomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
