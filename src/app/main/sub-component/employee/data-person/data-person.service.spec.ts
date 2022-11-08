/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataPersonService } from './data-person.service';

describe('Service: DataPerson', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataPersonService]
    });
  });

  it('should ...', inject([DataPersonService], (service: DataPersonService) => {
    expect(service).toBeTruthy();
  }));
});
