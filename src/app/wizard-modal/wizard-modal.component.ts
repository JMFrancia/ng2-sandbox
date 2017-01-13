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

  /**
   * Programatically set breadcrumb options
   * @param  {any}    options An object in the form { {name : <option1 name>, disabled <true/false>}, {...}, etc.}
   */
  public setBreadcrumbOptions(options : Array<any>) {
    this.breadcrumb.options = options;
  }

  /**
   * Opens wizard modal
   */
  public open() {
    this.modal.open();
  }

}
