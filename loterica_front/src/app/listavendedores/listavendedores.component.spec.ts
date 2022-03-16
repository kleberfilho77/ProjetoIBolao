import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListavendedoresComponent } from './listavendedores.component';

describe('ListavendedoresComponent', () => {
  let component: ListavendedoresComponent;
  let fixture: ComponentFixture<ListavendedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListavendedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListavendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
