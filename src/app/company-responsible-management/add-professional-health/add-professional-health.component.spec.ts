import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessionalHealthComponent } from './add-professional-health.component';

describe('AddProfessionalHealthComponent', () => {
  let component: AddProfessionalHealthComponent;
  let fixture: ComponentFixture<AddProfessionalHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfessionalHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfessionalHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
