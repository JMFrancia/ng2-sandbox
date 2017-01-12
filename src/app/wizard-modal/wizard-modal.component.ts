import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'wizard-modal',
  templateUrl: './wizard-modal.component.html',
  styleUrls: ['./wizard-modal.component.css']
})
export class WizardModalComponent implements OnInit {
@ViewChild('modal') modal;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.modal.open();
  }

}
