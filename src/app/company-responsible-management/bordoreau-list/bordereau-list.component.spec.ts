import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauListComponent } from './bordereau-list.component';

describe('BordereauListComponent', () => {
  let component: BordereauListComponent;
  let fixture: ComponentFixture<BordereauListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BordereauListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BordereauListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
