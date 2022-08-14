/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtComponent } from './ot.component';

describe('OtComponent', () => {
  let component: OtComponent;
  let fixture: ComponentFixture<OtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
