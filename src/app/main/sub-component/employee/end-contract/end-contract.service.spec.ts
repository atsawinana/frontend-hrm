/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EndContractService } from './end-contract.service';

describe('Service: EndContract', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndContractService]
    });
  });

  it('should ...', inject([EndContractService], (service: EndContractService) => {
    expect(service).toBeTruthy();
  }));
});
