import { TestBed } from '@angular/core/testing';

import { TermApiService } from './term-api.service';

describe('TermApiService', () => {
  let service: TermApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
