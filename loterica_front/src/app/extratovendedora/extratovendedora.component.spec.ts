import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratovendedoraComponent } from './extratovendedora.component';

describe('ExtratovendedoraComponent', () => {
  let component: ExtratovendedoraComponent;
  let fixture: ComponentFixture<ExtratovendedoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratovendedoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratovendedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
