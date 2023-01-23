/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeattendanceHistoryAllComponent } from './timeattendance-history-all.component';

describe('TimeattendanceHistoryAllComponent', () => {
  let component: TimeattendanceHistoryAllComponent;
  let fixture: ComponentFixture<TimeattendanceHistoryAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeattendanceHistoryAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeattendanceHistoryAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
