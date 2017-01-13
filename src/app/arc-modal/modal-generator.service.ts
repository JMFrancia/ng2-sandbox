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

  /**
   * Generates a component and injects it into a viewContainer
   * @param  {Type<Component>}   type  Component object from which to generate the new modal
   * @param  {ViewContainerRef}  vCref The ViewContainerRef into which the modal will be injected
   * @return {ComponentRef<any>}       ComponentRef to the newly generated modal component
   */
   private createComponent (type : Type<Component>, vCref: ViewContainerRef): ComponentRef<any> {
     let factory = this._cmpFctryRslvr.resolveComponentFactory(type);
     // vCref is needed cause of that injector..
     let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);
     // create component without adding it directly to the DOM
     let comp = factory.create(injector);
     return comp;
   }

  /**
   * Generates, injects, and returns an ArcModal
   * @param  {string}           type  Name of modal component type (such as "wizard"), as listed in ModalGeneratorService._modalDatabase
   * @param  {ViewContainerRef} vcRef The ViewContainerRef into which the modal will be injected
   * @return {ArcModal}               Newly generated ArcModal
   */
  public generateModal (type : string, vcRef : ViewContainerRef) : ArcModal {
    if(this._modalDatabase[type] == undefined) {
      console.error('ModalGeneratorService does not have modal type "' + type + '" in its database"');
      return null;
    }
    let modalComponent = this.createComponent(this._modalDatabase[type], vcRef);
    vcRef.insert(modalComponent.hostView);
    return new ArcModal(modalComponent, vcRef);
  }

}
