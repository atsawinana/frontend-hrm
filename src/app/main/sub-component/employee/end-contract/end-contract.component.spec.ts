/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EndContractComponent } from './end-contract.component';

describe('EndContractComponent', () => {
  let component: EndContractComponent;
  let fixture: ComponentFixture<EndContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
