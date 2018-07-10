import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssureComponent } from './edit-assure.component';

describe('EditAssureComponent', () => {
  let component: EditAssureComponent;
  let fixture: ComponentFixture<EditAssureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAssureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
