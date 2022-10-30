/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtNotiComponent } from './ot-noti.component';

describe('OtNotiComponent', () => {
  let component: OtNotiComponent;
  let fixture: ComponentFixture<OtNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtNotiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
