import { Component, OnDestroy, OnInit, Input, Output, EventEmitter, Type, ElementRef, HostBinding, Inject } from '@angular/core';
import { ModalInstance, ModalResult } from './modal-instance';

@Component({
    selector: 'modal',
    host: {
        'class': 'modal',
        'role': 'dialog',
        'tabindex': '-1'
    },
    template: `
        <div class="modal-dialog" [ngClass]="getCssClasses()">
            <div class="modal-content">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class ModalComponent implements OnDestroy, OnInit {

    private overrideSize: string = null;

    instance: ModalInstance;
    visible: boolean = false;
    elementReference: ElementRef;

    @Input() animation: boolean = true;
    @Input() backdrop: string | boolean = true;
    @Input() keyboard: boolean = true;
    @Input() size: string;
    @Input() width: number;
    @Input() height: number;
    @Input() cssClass: string = '';

    @Output() onClose: EventEmitter<any> = new EventEmitter(false);
    @Output() onDismiss: EventEmitter<any> = new EventEmitter(false);
    @Output() onOpen: EventEmitter<any> = new EventEmitter(false);

    @HostBinding('class.fade') get fadeClass(): boolean {
        return this.animation;
    }

    @HostBinding('attr.data-keyboard') get dataKeyboardAttr(): boolean {
        return this.keyboard;
    }

    @HostBinding('attr.data-backdrop') get dataBackdropAttr(): string | boolean {
        return this.backdrop;
    }

    constructor(private element: ElementRef) {
        this.elementReference = this.element;
        this.instance = new ModalInstance(this.element);

        this.instance.hidden.subscribe((result) => {
            this.visible = this.instance.visible;
            if (result === ModalResult.Dismiss) {
                this.onDismiss.emit(undefined);
            }
        });

        this.instance.shown.subscribe(() => {
            this.onOpen.emit(undefined);
        });
    }

    ngOnInit() {
      this.elementReference.nativeElement.style.width = this.width ? this.width + 'px': '';
      this.elementReference.nativeElement.style.height = this.height ? this.height + 'px': '';
    }

    ngOnDestroy() {
        return this.instance && this.instance.destroy();
    }

    routerCanDeactivate(): any {
        return this.ngOnDestroy();
    }

    open(size?: string): Promise<void> {
        if (ModalSize.validSize(size)) this.overrideSize = size;
        return this.instance.open().then(() => {
            this.visible = this.instance.visible;
        });
    }

    close(value?: any): Promise<void> {
        return this.instance.close().then(() => {
            this.onClose.emit(value);
        });
    }

    dismiss(): Promise<void> {
        return this.instance.dismiss();
    }

    getStyleOverride() : string {
      let result : string = (this.width ? 'width : ' + this.width + ' ' : '') +
             (this.height ? 'height : ' + this.height : '');
      console.log("NEW STYLE: " + result);
      return result;
    }

    getCssClasses(): string {
        let classes: string[] = [];

        if (this.isSmall()) {
            classes.push('modal-sm');
        }

        if (this.isLarge()) {
            classes.push('modal-lg');
        }

        if (this.cssClass !== '') {
            classes.push(this.cssClass);
        }

        return classes.join(' ');
    }

    private isSmall() {
        return this.overrideSize !== ModalSize.Large
            && this.size === ModalSize.Small
            || this.overrideSize === ModalSize.Small;
    }

    private isLarge() {
        return this.overrideSize !== ModalSize.Small
            && this.size === ModalSize.Large
            || this.overrideSize === ModalSize.Large;
    }
}

export class ModalSize {
    static Small = 'sm';
    static Large = 'lg';

    static validSize(size: string) {
        return size && (size === ModalSize.Small || size === ModalSize.Large);
    }
}
