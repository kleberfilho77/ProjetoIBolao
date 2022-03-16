import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratolotericaComponent } from './extratoloterica.component';

describe('ExtratolotericaComponent', () => {
  let component: ExtratolotericaComponent;
  let fixture: ComponentFixture<ExtratolotericaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratolotericaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratolotericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
