import { ViewContainerRef, ComponentRef } from '@angular/core';

/**
 * ArcModal object for use in main app
 */
export class ArcModal {
  private viewCRef : ViewContainerRef;
  private instance : any;

  /**
   * Constructor for ArcModal
   * @param  {ComponentRef<any>} modal            Component reference for the modal
   * @param  {ViewContainerRef}  viewContainerRef Reference to the view container the modal was injected into in ModalGeneratorService
   * @return {[type]}                             Arcmodal object
   */
  constructor(modal : ComponentRef<any>, viewContainerRef : ViewContainerRef) {
    this.viewCRef = viewContainerRef;
    this.instance = modal.instance;
  }

  /**
   * Opens the ArcModal instance
   */
  public open() {
    this.instance.open();
  }

  /**
   * Attaches a callback function to an event emitter within a viewChild component in the ArcModal instance
   * @param  {string}   component Name of the viewchild component
   * @param  {string}   emitter   Name of the emitter
   * @param  {Function} callback  The callback function
   */
  public attachCallback(component : string, emitter : string, callback : Function) {
    if(this.instance[component] == undefined) {
      console.error('Modal does not have a ' + component + ' + component attached');
      return;
    }
    if(this.instance[component][emitter] == undefined) {
      console.error(component + ' component nested in modal does not have a ' + emitter + ' emitter attached');
      return;
    }
    this.instance[component][emitter].subscribe(callback);
  }

  /**
   * Returns the modal instance
   * @return {[type]} The modal instance object
   */
  public getInstance() : ComponentRef<any> {
    return this.instance;
  }

  /**
   * Returns the view container reference object
   * @return ViewContainerRef the view container reference object
   */
  public getViewContainerRef() : ViewContainerRef {
    return this.viewCRef;
  }
}
