import { TestBed, inject } from '@angular/core/testing';

import { GestionnairesService } from './gestionnaires.service';

describe('GestionnairesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionnairesService]
    });
  });

  it('should be created', inject([GestionnairesService], (service: GestionnairesService) => {
    expect(service).toBeTruthy();
  }));
});
