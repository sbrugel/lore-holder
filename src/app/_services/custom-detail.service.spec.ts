import { TestBed } from '@angular/core/testing';

import { CustomDetailService } from './custom-detail.service';

describe('CustomDetailService', () => {
  let service: CustomDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
