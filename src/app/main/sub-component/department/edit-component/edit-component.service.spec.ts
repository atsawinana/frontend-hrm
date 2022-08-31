/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EditComponentService } from './edit-component.service';

describe('Service: EditComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditComponentService]
    });
  });

  it('should ...', inject([EditComponentService], (service: EditComponentService) => {
    expect(service).toBeTruthy();
  }));
});
