import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultAssureComponent } from './consult-assure.component';

describe('ConsultAssureComponent', () => {
  let component: ConsultAssureComponent;
  let fixture: ComponentFixture<ConsultAssureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultAssureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultAssureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
