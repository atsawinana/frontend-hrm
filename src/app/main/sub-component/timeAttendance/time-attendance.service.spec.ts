/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimeAttendanceService } from './time-attendance.service';

describe('Service: TimeAttendance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeAttendanceService]
    });
  });

  it('should ...', inject([TimeAttendanceService], (service: TimeAttendanceService) => {
    expect(service).toBeTruthy();
  }));
});
