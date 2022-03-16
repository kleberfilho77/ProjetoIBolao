import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkexpiradoComponent } from './linkexpirado.component';

describe('LinkexpiradoComponent', () => {
  let component: LinkexpiradoComponent;
  let fixture: ComponentFixture<LinkexpiradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkexpiradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkexpiradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
