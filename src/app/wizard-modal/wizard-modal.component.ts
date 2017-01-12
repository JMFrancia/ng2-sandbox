import { Component, OnInit, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';

@Component({
  selector: 'wizard-modal',
  templateUrl: './wizard-modal.component.html',
  styleUrls: ['./wizard-modal.component.css']
})
export class WizardModalComponent implements OnInit {
@ViewChild('modal') modal;
@ViewChild('breadcrumb') breadcrumb;
@ViewChild('testForm') testForm;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.modal.open();
  }

}
