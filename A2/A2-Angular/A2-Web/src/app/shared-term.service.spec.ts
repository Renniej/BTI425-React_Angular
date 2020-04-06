import { TestBed } from '@angular/core/testing';

import { SharedTermService } from './shared-term.service';

describe('SharedTermService', () => {
  let service: SharedTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
