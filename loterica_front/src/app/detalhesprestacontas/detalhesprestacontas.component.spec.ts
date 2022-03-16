import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesprestacontasComponent } from './detalhesprestacontas.component';

describe('DetalhesprestacontasComponent', () => {
  let component: DetalhesprestacontasComponent;
  let fixture: ComponentFixture<DetalhesprestacontasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesprestacontasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesprestacontasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
