import { TestBed } from '@angular/core/testing';

import { CharacterLinkService } from './character-link.service';

describe('CharacterLinkService', () => {
  let service: CharacterLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
