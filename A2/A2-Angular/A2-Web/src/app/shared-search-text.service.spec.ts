import { TestBed } from '@angular/core/testing';

import { SharedSearchTextService } from './shared-search-text.service';

describe('SharedSearchTextService', () => {
  let service: SharedSearchTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSearchTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
