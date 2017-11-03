import { TestBed, inject } from '@angular/core/testing';

import { InDevelopService } from './in-develop.service';

describe('InDevelopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InDevelopService]
    });
  });

  it('should be created', inject([InDevelopService], (service: InDevelopService) => {
    expect(service).toBeTruthy();
  }));
});
