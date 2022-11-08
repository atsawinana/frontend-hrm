/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WorkNotiComponent } from './work-noti.component';

describe('WorkNotiComponent', () => {
  let component: WorkNotiComponent;
  let fixture: ComponentFixture<WorkNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkNotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
