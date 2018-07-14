import { TestBed, inject } from '@angular/core/testing';

import { AssuresService } from './assures.service';

describe('AssuresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssuresService]
    });
  });

  it('should be created', inject([AssuresService], (service: AssuresService) => {
    expect(service).toBeTruthy();
  }));
});
