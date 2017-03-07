/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventOngoingComponent } from './event-ongoing.component';

describe('EventOngoingComponent', () => {
  let component: EventOngoingComponent;
  let fixture: ComponentFixture<EventOngoingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOngoingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOngoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
