import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauElementComponent } from './bordereau-element.component';

describe('BordereauElementComponent', () => {
  let component: BordereauElementComponent;
  let fixture: ComponentFixture<BordereauElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BordereauElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BordereauElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
