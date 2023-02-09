/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OtService } from './ot.service';

describe('Service: Ot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtService]
    });
  });

  it('should ...', inject([OtService], (service: OtService) => {
    expect(service).toBeTruthy();
  }));
});
