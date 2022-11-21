/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataPersonBtnComponent } from './data-person-btn.component';

describe('DataPersonBtnComponent', () => {
  let component: DataPersonBtnComponent;
  let fixture: ComponentFixture<DataPersonBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPersonBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPersonBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
