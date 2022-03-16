import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoaprovadoComponent } from './pagamentoaprovado.component';

describe('PagamentoaprovadoComponent', () => {
  let component: PagamentoaprovadoComponent;
  let fixture: ComponentFixture<PagamentoaprovadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoaprovadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoaprovadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
