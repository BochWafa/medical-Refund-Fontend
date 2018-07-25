import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsutlerBulletinComponent } from './consutler-bulletin.component';

describe('ConsutlerBulletinComponent', () => {
  let component: ConsutlerBulletinComponent;
  let fixture: ComponentFixture<ConsutlerBulletinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsutlerBulletinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsutlerBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
