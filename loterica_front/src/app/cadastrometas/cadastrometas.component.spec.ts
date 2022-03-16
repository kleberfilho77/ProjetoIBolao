import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrometasComponent } from './cadastrometas.component';

describe('CadastrometasComponent', () => {
  let component: CadastrometasComponent;
  let fixture: ComponentFixture<CadastrometasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrometasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrometasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
