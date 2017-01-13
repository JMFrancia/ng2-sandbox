import { ViewContainerRef, ComponentRef } from '@angular/core';

export class ArcModal {
  private viewCRef : ViewContainerRef;
  private instance : any;

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
  public getModalInstance() {
    return this.instance;
  }
}
