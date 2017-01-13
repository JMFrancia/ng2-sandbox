import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() options : Array<any>;
  @Input() selectedIndex : number;
  @Output() selectionMade : any = new EventEmitter();

  private selected : any;

  /**
   * Select breadcrumb option
   * @param  {any}        option Option being selected
   * @param  {boolean = true}    Flag set to true if event should be emitted for this selection
   */
  private selectOption(option: any, broadcastSelection: boolean = true) {
    if(this.selected === option || option.disabled)
      return;
    this.selected = option;
    if(broadcastSelection)
      this.selectionMade.emit(this.selected);
  }

  ngOnInit() {
    if(this.selectedIndex !== undefined)
      this.selectOption(this.options[this.selectedIndex], false);
  }

}
