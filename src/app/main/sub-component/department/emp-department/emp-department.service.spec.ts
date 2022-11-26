/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmpDepartmentService } from './emp-department.service';

describe('Service: EmpDepartment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpDepartmentService]
    });
  });

  it('should ...', inject([EmpDepartmentService], (service: EmpDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
