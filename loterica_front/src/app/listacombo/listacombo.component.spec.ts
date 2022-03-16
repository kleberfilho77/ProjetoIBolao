import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacomboComponent } from './listacombo.component';

describe('ListacomboComponent', () => {
  let component: ListacomboComponent;
  let fixture: ComponentFixture<ListacomboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListacomboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListacomboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
