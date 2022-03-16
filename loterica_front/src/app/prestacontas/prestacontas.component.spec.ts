import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PrestacontasComponent } from './prestacontas.component';

describe('PrestacontasComponent', () => {
  let component: PrestacontasComponent;
  let fixture: ComponentFixture<PrestacontasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestacontasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacontasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
