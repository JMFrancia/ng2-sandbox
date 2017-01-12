import { Injectable, ViewChild, ViewContainerRef, ElementRef,
         EventEmitter, OnInit, ComponentRef, ComponentFactoryResolver,
         ReflectiveInjector } from '@angular/core';
import { WizardModalComponent } from './wizard-modal/wizard-modal.component'


@Injectable()
export class ModalGeneratorService {
  private _wizardModalInstance : ComponentRef<WizardModalComponent>;

  constructor(private _cmpFctryRslvr: ComponentFactoryResolver, private _vcRef: ViewContainerRef) {}

  private createWizardModalComponent (vCref: ViewContainerRef): ComponentRef<WizardModalComponent> {
    let factory = this._cmpFctryRslvr.resolveComponentFactory(WizardModalComponent);
    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);
    // create component without adding it directly to the DOM
    let comp = factory.create(injector);
    return comp;
  }

  private injectWizardModal(vcRef : ViewContainerRef) {
    this._wizardModalInstance = this.createWizardModalComponent(vcRef);
    vcRef.insert(this._wizardModalInstance.hostView);
  }

  public generateWizardModal(vcRef : ViewContainerRef) {
    if(!this.wizardModalGenerated()) {
      this.injectWizardModal(vcRef);
    }
  }

  public wizardModalGenerated() : boolean {
    return !!this._wizardModalInstance;
  }

  public attachWizardModalTestFormChangeFunction( callback : Function ) {
    if(this.wizardModalGenerated()) {
      this._wizardModalInstance.instance.testForm.data.subscribe(callback);
    }
  }

  public getWizardModal() : ComponentRef<WizardModalComponent> {
    if(this.wizardModalGenerated()) {
      return this._wizardModalInstance;
    }
    return null;
  }

  public openWizardModal() {
    if(this.wizardModalGenerated()) {
      this._wizardModalInstance.instance.open();
    }
  }

}
