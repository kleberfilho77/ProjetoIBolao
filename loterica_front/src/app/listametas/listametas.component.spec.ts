import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListametasComponent } from './listametas.component';

describe('ListametasComponent', () => {
  let component: ListametasComponent;
  let fixture: ComponentFixture<ListametasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListametasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListametasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
