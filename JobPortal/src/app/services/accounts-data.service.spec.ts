import { TestBed } from '@angular/core/testing';

import { AccountsDataService } from './accounts-data.service';

describe('AccountsDataService', () => {
  let service: AccountsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
