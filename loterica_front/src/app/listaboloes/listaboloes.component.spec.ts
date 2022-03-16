import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaboloesComponent } from './listaboloes.component';

describe('ListaboloesComponent', () => {
  let component: ListaboloesComponent;
  let fixture: ComponentFixture<ListaboloesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaboloesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaboloesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
