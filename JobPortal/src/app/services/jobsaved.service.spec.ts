import { TestBed } from '@angular/core/testing';

import { JobsavedService } from './jobsaved.service';

describe('JobsavedService', () => {
  let service: JobsavedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsavedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
