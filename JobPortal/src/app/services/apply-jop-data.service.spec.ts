import { TestBed } from '@angular/core/testing';

import { ApplyJopDataService } from './apply-jop-data.service';

describe('ApplyJopDataService', () => {
  let service: ApplyJopDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyJopDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
