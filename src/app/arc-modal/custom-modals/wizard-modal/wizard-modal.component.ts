import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'wizard-modal',
  templateUrl: './wizard-modal.component.html',
  styleUrls: ['./wizard-modal.component.css']
})
export class WizardModalComponent {
@ViewChild('modal') modal;
@ViewChild('breadcrumb') breadcrumb;
@ViewChild('testForm') testForm;

  public open() {
    this.modal.open();
  }

}
