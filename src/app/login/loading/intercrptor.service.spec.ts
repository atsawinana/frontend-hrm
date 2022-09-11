/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IntercrptorService } from './intercrptor.service';

describe('Service: Intercrptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntercrptorService]
    });
  });

  it('should ...', inject([IntercrptorService], (service: IntercrptorService) => {
    expect(service).toBeTruthy();
  }));
});
