/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UnapprovedComponent } from './unapproved.component';

describe('UnapprovedComponent', () => {
  let component: UnapprovedComponent;
  let fixture: ComponentFixture<UnapprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
