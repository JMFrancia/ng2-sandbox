import { Component, ViewChild, ViewContainerRef, ElementRef, Input, Output, OnInit, ComponentRef, ComponentFactoryResolver, ReflectiveInjector } from '@angular/core';
import { ModalGeneratorService } from './arc-modal/modal-generator.service'
import { ArcModal } from './arc-modal/arc-modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ModalGeneratorService ]
})
export class AppComponent implements OnInit {
  @ViewChild('modalPlaceholder', {read: ViewContainerRef}) private _placeHolder: ViewContainerRef;

  formText : any;
  wizardModal : ArcModal;

  constructor(private _mgService: ModalGeneratorService, private _cmpFctryRslvr: ComponentFactoryResolver, private _vcRef: ViewContainerRef) {}

  ngOnInit() {
    this.wizardModal = this._mgService.generateModal("wizard", this._placeHolder);
    this.wizardModal.attachCallback('testForm', 'data', (event => this.formText = event));
  }

  private openWizardModal() {
    this.wizardModal.open();
  }

  private logOutput(output : any) {
    console.log("App-level logging: " + output);
  }

}
