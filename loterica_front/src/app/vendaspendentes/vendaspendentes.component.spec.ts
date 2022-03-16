import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaspendentesComponent } from './vendaspendentes.component';

describe('VendaspendentesComponent', () => {
  let component: VendaspendentesComponent;
  let fixture: ComponentFixture<VendaspendentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendaspendentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendaspendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
