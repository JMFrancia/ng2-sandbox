import { Injectable, ViewChild, ViewContainerRef, ElementRef,
         EventEmitter, OnInit, ComponentRef, ComponentFactoryResolver,
         Component, Type, ReflectiveInjector } from '@angular/core';
import { WizardModalComponent } from './wizard-modal/wizard-modal.component'


@Injectable()
export class ModalGeneratorService {
  private _modalDatabase : any = {
    "wizard" : WizardModalComponent
  }

  //TO-DO: Refactor _modalInstances to create a hash from the instances' viewContainerRef as key instead of
  //modal type. That way, can have multiple modals of same type, attached to different viewContainerRefs
  private _modalInstances : any = {};

  private _wizardModalInstance : ComponentRef<WizardModalComponent>;

  constructor(private _cmpFctryRslvr: ComponentFactoryResolver, private _vcRef: ViewContainerRef) {}

  private createModalComponent (compType : Type<Component>, vCref: ViewContainerRef): ComponentRef<any> {
    let factory = this._cmpFctryRslvr.resolveComponentFactory(compType);
    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);
    // create component without adding it directly to the DOM
    let comp = factory.create(injector);
    return comp;
  }

  private getModalInstance (type : string) : any {

  }

  public generateModal (type : string, vcRef : ViewContainerRef) {
    if (this._modalDatabase[type] !== undefined) {
      let modalComponent = this.createModalComponent(this._modalDatabase[type], vcRef);
      vcRef.insert(modalComponent.hostView);
      this._modalInstances[type] = modalComponent.instance;
    } else {
      console.error('ModalGeneratorService does not have modal type "' + type + '" in its database"');
    }
  }

  public openModal (type : string, vcRef : ViewContainerRef) {
    if(this._modalDatabase[type] == undefined) {
      console.error('ModalGeneratorService does not have modal type "' + type + '" in its database"');
      return;
    }
    if(this._modalInstances[type] == undefined) {
      this.generateModal(type, vcRef);
    }
    this._modalInstances[type].open();
  }

/*
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
*/
}
