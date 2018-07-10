import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssureComponent } from './list-assure.component';

describe('ListAssureComponent', () => {
  let component: ListAssureComponent;
  let fixture: ComponentFixture<ListAssureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAssureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
