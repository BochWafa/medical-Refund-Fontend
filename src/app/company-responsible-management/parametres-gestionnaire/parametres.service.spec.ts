import { TestBed, inject } from '@angular/core/testing';

import { ParametresService } from './parametres.service';

describe('ParametresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametresService]
    });
  });

  it('should be created', inject([ParametresService], (service: ParametresService) => {
    expect(service).toBeTruthy();
  }));
});
