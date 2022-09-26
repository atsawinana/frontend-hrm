/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtHistoryPersonComponent } from './ot-history-person.component';

describe('OtHistoryPersonComponent', () => {
  let component: OtHistoryPersonComponent;
  let fixture: ComponentFixture<OtHistoryPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtHistoryPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtHistoryPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
