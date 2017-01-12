import { Component, ViewChild, ViewContainerRef, ElementRef, Input, Output, EventEmitter, OnInit, ComponentRef, ComponentFactoryResolver, ReflectiveInjector } from '@angular/core';
import { WizardModalComponent } from './wizard-modal/wizard-modal.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('placeHolder', {read: ViewContainerRef}) private _placeHolder: ViewContainerRef;

  testWizard : ComponentRef<WizardModalComponent>;
  formText : any;

  constructor(private _cmpFctryRslvr: ComponentFactoryResolver, private _vcRef: ViewContainerRef) {}

  ngOnInit() { }

  /* Creates wizard modal component */
  private createWizardModalComponent (vCref: ViewContainerRef): ComponentRef<WizardModalComponent> {
    let factory = this._cmpFctryRslvr.resolveComponentFactory(WizardModalComponent);
    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);
    // create component without adding it directly to the DOM
    let comp = factory.create(injector);
    return comp;
  }

  /* Injects wizard modal into template */
  private injectWizardModal() {
    this.testWizard = this.createWizardModalComponent(this._placeHolder);
    this._placeHolder.insert(this.testWizard.hostView);
  }

 /* Opens wizard modal */
  private openWizardModal() {
    if(!this.testWizard) {
      this.injectWizardModal();
    }
    this.testWizard.instance.open();
  }

  private logOutput(output : any) {
    console.log("App-level logging: " + output);
  }

}
