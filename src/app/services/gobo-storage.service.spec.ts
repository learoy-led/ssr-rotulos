import { TestBed } from '@angular/core/testing';

import { GoboStorageService } from './gobo-storage.service';

describe('GoboStorageService', () => {
  let service: GoboStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoboStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
