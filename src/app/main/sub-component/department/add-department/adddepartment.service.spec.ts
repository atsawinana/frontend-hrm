/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdddepartmentService } from './adddepartment.service';

describe('Service: Adddepartment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdddepartmentService]
    });
  });

  it('should ...', inject([AdddepartmentService], (service: AdddepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
