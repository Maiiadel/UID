import { TestBed } from '@angular/core/testing';

import { UnitCostService } from './unit-cost.service';

describe('UnitCostService', () => {
  let service: UnitCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
