import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemboursementDialogComponent } from './remboursement-dialog.component';

describe('RemboursementDialogComponent', () => {
  let component: RemboursementDialogComponent;
  let fixture: ComponentFixture<RemboursementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemboursementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemboursementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
