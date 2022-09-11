/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListDepartmentService } from './list-department.service';

describe('Service: ListDepartment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListDepartmentService]
    });
  });

  it('should ...', inject([ListDepartmentService], (service: ListDepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
