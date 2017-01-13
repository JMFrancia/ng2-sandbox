import { Injectable, ViewChild, ViewContainerRef, ElementRef,
         EventEmitter, OnInit, ComponentRef, ComponentFactoryResolver,
         Component, Type, ReflectiveInjector } from '@angular/core';
import { ArcModal } from './arc-modal';
import { WizardModalComponent } from './wizard-modal/wizard-modal.component'

@Injectable()
export class ModalGeneratorService {
  private _modalDatabase : any = {
    "wizard" : WizardModalComponent
  }

  constructor(private _cmpFctryRslvr: ComponentFactoryResolver, private _vcRef: ViewContainerRef) {}

  //Injects a component of type 'type' into the given view container,
  //and returns a component ref to the new component
  private createComponent (type : Type<Component>, vCref: ViewContainerRef): ComponentRef<any> {
    let factory = this._cmpFctryRslvr.resolveComponentFactory(type);
    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);
    // create component without adding it directly to the DOM
    let comp = factory.create(injector);
    return comp;
  }

  //Generates and returns an ArcModal from database[type], injecting it into vcRef
  public generateModal (type : string, vcRef : ViewContainerRef) : ArcModal {
    if(this._modalDatabase[type] == undefined) {
      console.error('ModalGeneratorService does not have modal type "' + type + '" in its database"');
      return null;
    }
    let modalComponent = this.createComponent(this._modalDatabase[type], vcRef);
    vcRef.insert(modalComponent.hostView);
    let newModal = new ArcModal(modalComponent, vcRef);
    return newModal;
  }

}
