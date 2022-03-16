import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarwhatsComponent } from './enviarwhats.component';

describe('EnviarwhatsComponent', () => {
  let component: EnviarwhatsComponent;
  let fixture: ComponentFixture<EnviarwhatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarwhatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnviarwhatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
