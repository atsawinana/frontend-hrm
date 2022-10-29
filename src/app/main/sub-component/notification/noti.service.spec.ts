/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotiService } from './noti.service';

describe('Service: Noti', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotiService]
    });
  });

  it('should ...', inject([NotiService], (service: NotiService) => {
    expect(service).toBeTruthy();
  }));
});
