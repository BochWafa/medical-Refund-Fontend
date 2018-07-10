import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBulletinSoinComponent } from './list-bulletin-soin.component';

describe('ListBulletinSoinComponent', () => {
  let component: ListBulletinSoinComponent;
  let fixture: ComponentFixture<ListBulletinSoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBulletinSoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBulletinSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
