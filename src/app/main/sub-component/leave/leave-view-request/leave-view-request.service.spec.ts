/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveViewRequestService } from './leave-view-request.service';

describe('Service: LeaveViewRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveViewRequestService]
    });
  });

  it('should ...', inject([LeaveViewRequestService], (service: LeaveViewRequestService) => {
    expect(service).toBeTruthy();
  }));
});
