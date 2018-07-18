import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateEnvoiComponent } from './date-envoi.component';

describe('DateEnvoiComponent', () => {
  let component: DateEnvoiComponent;
  let fixture: ComponentFixture<DateEnvoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateEnvoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateEnvoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
