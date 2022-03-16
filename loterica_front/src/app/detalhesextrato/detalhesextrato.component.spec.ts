import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesextratoComponent } from './detalhesextrato.component';

describe('DetalhesextratoComponent', () => {
  let component: DetalhesextratoComponent;
  let fixture: ComponentFixture<DetalhesextratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesextratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesextratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
