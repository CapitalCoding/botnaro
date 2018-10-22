import { TestBed } from '@angular/core/testing';

import { FakenewsService } from './fakenews.service';

describe('FakenewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FakenewsService = TestBed.get(FakenewsService);
    expect(service).toBeTruthy();
  });
});
