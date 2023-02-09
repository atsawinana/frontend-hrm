/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtBtnOverComponent } from './ot-btn-over.component';

describe('OtBtnOverComponent', () => {
  let component: OtBtnOverComponent;
  let fixture: ComponentFixture<OtBtnOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtBtnOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtBtnOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
