import { TestBed } from '@angular/core/testing';

import { WeekViewService } from './week-view.service';

describe('WeekViewService', () => {
  let service: WeekViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
