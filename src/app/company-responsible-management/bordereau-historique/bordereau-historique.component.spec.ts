import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauHistoriqueComponent } from './bordereau-historique.component';

describe('BordereauHistoriqueComponent', () => {
  let component: BordereauHistoriqueComponent;
  let fixture: ComponentFixture<BordereauHistoriqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BordereauHistoriqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BordereauHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
