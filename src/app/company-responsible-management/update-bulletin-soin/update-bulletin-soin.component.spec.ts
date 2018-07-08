import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBulletinSoinComponent } from './update-bulletin-soin.component';

describe('UpdateBulletinSoinComponent', () => {
  let component: UpdateBulletinSoinComponent;
  let fixture: ComponentFixture<UpdateBulletinSoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBulletinSoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBulletinSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
