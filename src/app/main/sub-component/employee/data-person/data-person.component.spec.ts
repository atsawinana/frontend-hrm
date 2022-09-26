/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataPersonComponent } from './data-person.component';

describe('DataPersonComponent', () => {
  let component: DataPersonComponent;
  let fixture: ComponentFixture<DataPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
