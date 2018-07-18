import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresGestionnaireComponent } from './parametres-gestionnaire.component';

describe('ParametresGestionnaireComponent', () => {
  let component: ParametresGestionnaireComponent;
  let fixture: ComponentFixture<ParametresGestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametresGestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
