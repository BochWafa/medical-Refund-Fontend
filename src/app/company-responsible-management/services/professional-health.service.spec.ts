import { TestBed, inject } from '@angular/core/testing';

import { ProfessionalHealthService } from './professional-health.service';

describe('ProfessionalHealthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessionalHealthService]
    });
  });

  it('should be created', inject([ProfessionalHealthService], (service: ProfessionalHealthService) => {
    expect(service).toBeTruthy();
  }));
});
