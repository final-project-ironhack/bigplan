/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UpdateEventsService } from './update-events.service';

describe('UpdateEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateEventsService]
    });
  });

  it('should ...', inject([UpdateEventsService], (service: UpdateEventsService) => {
    expect(service).toBeTruthy();
  }));
});
