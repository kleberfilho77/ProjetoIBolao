import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacotasComponent } from './listacotas.component';

describe('ListacotasComponent', () => {
  let component: ListacotasComponent;
  let fixture: ComponentFixture<ListacotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
