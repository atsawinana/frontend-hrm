/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListEmployeeService } from './list-employee.service';

describe('Service: ListEmployee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListEmployeeService]
    });
  });

  it('should ...', inject([ListEmployeeService], (service: ListEmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
