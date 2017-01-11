import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'modal-test-form',
  template: `
    <form>
      <input name="data" placeholder="Type something" ngModel (ngModelChange)="onTextChange($event)"/>
    </form>
  `,
  //templateUrl: './modal-test-form.component.html',
  styleUrls: ['./modal-test-form.component.css']
})
export class ModalTestFormComponent implements OnInit {
  @ViewChild(NgForm) testForm : NgForm;
  @Output() data : any = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onTextChange(val : string) {
    this.data.emit(val);
  }

}
