import { TestBed } from '@angular/core/testing';

import { StoryModuleService } from './story-module.service';

describe('StoryModuleService', () => {
  let service: StoryModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
