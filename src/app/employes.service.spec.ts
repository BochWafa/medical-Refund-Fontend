import { TestBed, inject } from '@angular/core/testing';

import { EmployesService } from './employes.service';

describe('EmployesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployesService]
    });
  });

  it('should be created', inject([EmployesService], (service: EmployesService) => {
    expect(service).toBeTruthy();
  }));
});
