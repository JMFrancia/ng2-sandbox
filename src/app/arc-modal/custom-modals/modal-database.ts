import { Type, Component } from '@angular/core';
//Modal Types
import { WizardModalComponent } from './wizard-modal/wizard-modal.component';

export class ModalDatabase {

  //Add modal types here
  private static modals : any = {
    "wizard" : WizardModalComponent
  }

  /**
   * Returns true if the specified modal type exists in the database
   * @param  {string}  type Modal type
   * @return {boolean}      True if the modal type exists in the database
   */
  public static contains(type : string) : boolean {
    return !(this.modals[type] == undefined);
  }

  /**
   * Returns a reference to the component type
   * @param  {string}          type Modal type
   * @return {Type<Component>}      A component reference for the modal type's component
   */
  public static get(type : string) : Type<Component> {
    if (this.contains(type)) {
      return this.modals[type];
    } else {
      console.error('ModalDatabase does not contain modal type "' + type + '"');
      return null;
    }
  }
}
