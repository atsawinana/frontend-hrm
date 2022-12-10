/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveHistoryService } from './leave-history.service';

describe('Service: LeaveHistory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveHistoryService]
    });
  });

  it('should ...', inject([LeaveHistoryService], (service: LeaveHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
