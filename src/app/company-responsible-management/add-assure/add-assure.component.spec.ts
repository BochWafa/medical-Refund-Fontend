import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssureComponent } from './add-assure.component';

describe('AddAssureComponent', () => {
  let component: AddAssureComponent;
  let fixture: ComponentFixture<AddAssureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
