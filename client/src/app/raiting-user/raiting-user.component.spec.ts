/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RaitingUserComponent } from './raiting-user.component';

describe('RaitingUserComponent', () => {
  let component: RaitingUserComponent;
  let fixture: ComponentFixture<RaitingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaitingUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaitingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
