import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationBulletinComponent } from './validation-bulletin.component';

describe('ValidationBulletinComponent', () => {
  let component: ValidationBulletinComponent;
  let fixture: ComponentFixture<ValidationBulletinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationBulletinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
