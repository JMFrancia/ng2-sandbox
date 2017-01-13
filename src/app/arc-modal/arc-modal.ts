import { ViewChild, ViewContainerRef, ElementRef,
         EventEmitter, OnInit, ComponentRef, ComponentFactoryResolver,
         Component, Type, ReflectiveInjector } from '@angular/core';

export class ArcModal {
  private viewCRef : ViewContainerRef;
  private instance : any;

  constructor(modal : ComponentRef<any>, viewContainerRef : ViewContainerRef) {
    this.viewCRef = viewContainerRef;
    this.instance = modal.instance;
  }

  public open() {
    this.instance.open();
  }

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

  public getModalInstance() {
    return this.instance;
  }
}
