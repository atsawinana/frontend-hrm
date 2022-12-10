/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetailViewRequestService } from './detail-view-request.service';

describe('Service: DetailViewRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailViewRequestService]
    });
  });

  it('should ...', inject([DetailViewRequestService], (service: DetailViewRequestService) => {
    expect(service).toBeTruthy();
  }));
});
