import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBulletinComponent } from './show-bulletin.component';

describe('ShowBulletinComponent', () => {
  let component: ShowBulletinComponent;
  let fixture: ComponentFixture<ShowBulletinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBulletinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
