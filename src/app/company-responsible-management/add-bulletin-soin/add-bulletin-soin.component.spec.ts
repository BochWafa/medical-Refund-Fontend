import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulletinSoinComponent } from './add-bulletin-soin.component';

describe('AddBulletinSoinComponent', () => {
  let component: AddBulletinSoinComponent;
  let fixture: ComponentFixture<AddBulletinSoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulletinSoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulletinSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
