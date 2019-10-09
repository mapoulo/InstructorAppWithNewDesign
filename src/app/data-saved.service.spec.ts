import { TestBed } from '@angular/core/testing';

import { DataSavedService } from './data-saved.service';

describe('DataSavedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSavedService = TestBed.get(DataSavedService);
    expect(service).toBeTruthy();
  });
});
