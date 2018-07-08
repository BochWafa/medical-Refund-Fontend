import { TestBed, inject } from '@angular/core/testing';

import { BulletinSoinService } from './bulletin-soin.service';

describe('BulletinSoinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BulletinSoinService]
    });
  });

  it('should be created', inject([BulletinSoinService], (service: BulletinSoinService) => {
    expect(service).toBeTruthy();
  }));
});
