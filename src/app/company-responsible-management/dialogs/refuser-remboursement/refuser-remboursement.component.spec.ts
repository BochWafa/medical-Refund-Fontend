import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuserRemboursementComponent } from './refuser-remboursement.component';

describe('RefuserRemboursementComponent', () => {
  let component: RefuserRemboursementComponent;
  let fixture: ComponentFixture<RefuserRemboursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuserRemboursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuserRemboursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
