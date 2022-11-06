/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EditDetailService } from './edit-detail.service';

describe('Service: EditDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditDetailService]
    });
  });

  it('should ...', inject([EditDetailService], (service: EditDetailService) => {
    expect(service).toBeTruthy();
  }));
});
