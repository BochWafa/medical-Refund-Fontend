import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMedicalComponent } from './article-medical.component';

describe('ArticleMedicalComponent', () => {
  let component: ArticleMedicalComponent;
  let fixture: ComponentFixture<ArticleMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
