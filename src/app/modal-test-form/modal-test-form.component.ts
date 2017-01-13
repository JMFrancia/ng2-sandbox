import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'modal-test-form',
  template: `
    <form>
      <input name="data" placeholder="Type something" ngModel (ngModelChange)="onTextChange($event)"/>
    </form>
  `
})
export class ModalTestFormComponent{
  @ViewChild(NgForm) testForm : NgForm;
  @Output() data : any = new EventEmitter();

  onTextChange(val : string) {
    this.data.emit(val);
  }

}
