import { Component, ViewChild, ViewContainerRef, ElementRef, Input, Output, OnInit, ComponentRef, ComponentFactoryResolver, ReflectiveInjector } from '@angular/core';
import { WizardModalComponent } from './wizard-modal/wizard-modal.component'

import { ModalGeneratorService } from './modal-generator.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ModalGeneratorService ]
})
export class AppComponent implements OnInit {
  @ViewChild('modalPlaceholder', {read: ViewContainerRef}) private _placeHolder: ViewContainerRef;

  formText : any;

  constructor(private _mgService: ModalGeneratorService, private _cmpFctryRslvr: ComponentFactoryResolver, private _vcRef: ViewContainerRef) {}

  ngOnInit() {
    //this._mgService.openModal('wizard', this._placeHolder);
    /*
    this._mgService.generateWizardModal(this._placeHolder);
    this._mgService.attachWizardModalTestFormChangeFunction(event => this.formText = event);
    */
  }

  private openWizardModal() {
    this._mgService.openModal('wizard', this._placeHolder);
  }


  private logOutput(output : any) {
    console.log("App-level logging: " + output);
  }

}
