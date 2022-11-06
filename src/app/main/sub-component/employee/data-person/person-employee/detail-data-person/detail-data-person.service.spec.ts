/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetailDataPersonService } from './detail-data-person.service';

describe('Service: DetailDataPerson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailDataPersonService]
    });
  });

  it('should ...', inject([DetailDataPersonService], (service: DetailDataPersonService) => {
    expect(service).toBeTruthy();
  }));
});
