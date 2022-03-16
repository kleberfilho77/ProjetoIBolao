import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelvendedoraComponent } from './painelvendedora.component';

describe('PainelvendedoraComponent', () => {
  let component: PainelvendedoraComponent;
  let fixture: ComponentFixture<PainelvendedoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelvendedoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelvendedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
