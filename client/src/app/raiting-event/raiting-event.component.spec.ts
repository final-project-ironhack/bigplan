/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RaitingEventComponent } from './raiting-event.component';

describe('RaitingEventComponent', () => {
  let component: RaitingEventComponent;
  let fixture: ComponentFixture<RaitingEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaitingEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaitingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
