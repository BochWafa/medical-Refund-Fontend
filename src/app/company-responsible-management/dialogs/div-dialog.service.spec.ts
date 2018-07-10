import { TestBed, inject } from '@angular/core/testing';

import { DivDialogService } from './div-dialog.service';

describe('DivDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DivDialogService]
    });
  });

  it('should be created', inject([DivDialogService], (service: DivDialogService) => {
    expect(service).toBeTruthy();
  }));
});
