import { TestBed } from '@angular/core/testing';

import { SizeFormService } from './size-form.service';

describe('SizeFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SizeFormService = TestBed.get(SizeFormService);
    expect(service).toBeTruthy();
  });
});
