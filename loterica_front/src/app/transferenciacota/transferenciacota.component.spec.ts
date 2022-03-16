import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciacotaComponent } from './transferenciacota.component';

describe('TransferenciacotaComponent', () => {
  let component: TransferenciacotaComponent;
  let fixture: ComponentFixture<TransferenciacotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciacotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciacotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
