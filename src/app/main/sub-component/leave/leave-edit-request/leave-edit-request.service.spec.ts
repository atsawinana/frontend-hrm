/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveEditRequestService } from './leave-edit-request.service';

describe('Service: LeaveEditRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveEditRequestService]
    });
  });

  it('should ...', inject([LeaveEditRequestService], (service: LeaveEditRequestService) => {
    expect(service).toBeTruthy();
  }));
});
