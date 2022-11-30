/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LeaveInfoService } from './leave-info.service';

describe('Service: LeaveInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeaveInfoService]
    });
  });

  it('should ...', inject([LeaveInfoService], (service: LeaveInfoService) => {
    expect(service).toBeTruthy();
  }));
});
