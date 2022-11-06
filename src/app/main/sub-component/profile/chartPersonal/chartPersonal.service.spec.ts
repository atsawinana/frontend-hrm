/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartPersonalService } from './chartPersonal.service';

describe('Service: ChartPersonal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartPersonalService]
    });
  });

  it('should ...', inject([ChartPersonalService], (service: ChartPersonalService) => {
    expect(service).toBeTruthy();
  }));
});
