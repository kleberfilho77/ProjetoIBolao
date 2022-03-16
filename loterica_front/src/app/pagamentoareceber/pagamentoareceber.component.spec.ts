import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoareceberComponent } from './pagamentoareceber.component';

describe('PagamentoareceberComponent', () => {
  let component: PagamentoareceberComponent;
  let fixture: ComponentFixture<PagamentoareceberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoareceberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoareceberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
