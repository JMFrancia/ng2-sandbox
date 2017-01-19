/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WizardModalComponent } from './wizard-modal.component';

describe('WizardModalComponent', () => {
  let component: WizardModalComponent;
  let fixture: ComponentFixture<WizardModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
