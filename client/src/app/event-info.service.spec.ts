/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventInfoService } from './event-info.service';

describe('EventInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventInfoService]
    });
  });

  it('should ...', inject([EventInfoService], (service: EventInfoService) => {
    expect(service).toBeTruthy();
  }));
});
