/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveHistoryPersonService } from './leave-history-person.service';

describe('Service: LeaveHistoryPerson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveHistoryPersonService]
    });
  });

  it('should ...', inject([LeaveHistoryPersonService], (service: LeaveHistoryPersonService) => {
    expect(service).toBeTruthy();
  }));
});
