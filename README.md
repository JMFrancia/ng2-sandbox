# Arc Modal
Arc Modal 1.0.0

Angular2 Bootstrap3 Modal Component with generator service

## Prerequisites

If you're using Typescript in your project, `arc-modal` requires Typescript v2.0.0 or greater. Also make sure that your editor (Visual Studio Code, Atom, Webstorm, etc.) supports Typescript >= v2.0.0 or you'll see errors even though it compiles.

## Dependencies

`arc-modal` depends on `bootstrap` which depends on `jquery`, you'll need to include both scripts before `ng2-bs3-modal` or somehow make them available globally, depending on your build system. You will also need to link to the `bootstrap` style configuration.

All three can be included in app.component.html like so:

```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.js"></script>
```

## TODO

- Create AttachInput function for ArcModal in order to attach custom input data to nested components within a service-generated modal

## Instructions

### Example: Creating a custom modal

1. Generate a new component within src/app/arc-modal/custom-modals.
2. In the template, use the modal, modal-header, modal-body, and modal-footer directives to design your modal.
3. In the controller, be sure to add a ViewChild for the modal, and also one for any component nested in the modal that
you want to communicate with the app outside the modal.
4. Add your modal's name and Component to src/app/arc-modal/custom-modals/modal-database

```html

<modal #modal>
    <modal-header [show-close]="true">
      <!-- Modal header template -->
      This is the header
    </modal-header>
    <modal-body>
        <!-- Modal body template -->
        This is some other component:
        <some-other-component #nestedComp></some-other-component>
    </modal-body>
    <modal-footer>
      <!-- Modal footer template -->
      This is the footer.
    </modal-footer>
</modal>
```

```typescript

import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'my-custom-modal',
  templateUrl: './my-custom-modal.component.html',
  styleUrls: ['./my-custom-modal.component.css']
})
export class MyCustomModalComponent {
@ViewChild('modal') modal;
@ViewChild('nestedComp') nestedComp;

  public open() {
    this.modal.open();
  }

}
```

```typescript
//modal-database.ts

import { Type, Component } from '@angular/core';
//Modal Types
import { WizardModalComponent } from './wizard-modal/wizard-modal.component';
import { MyCustomModalComponent } from './my-custom-modal/my-custom-modal.component'; // Import your modal

export class ModalDatabase {

  //Add modal types here
  private static modals : any = {
    "wizard" : WizardModalComponent,
    "myCustomModal" : MyCustomModal     // Add your modal here
  }

  //Other functions redacted for brevity
}
```

### Example: Using the Modal Generator Service

1. Add a template tag with a reference attached in your app's template. This will be the modal's placeholder.
2. In your controller, import the ArcModal class, and import the ModalGeneratorService as a provider
3. Create a ViewContainerRef variable with the viewchild decorator, connecting it to the template tag reference
from step 1
3. Use the generator's generateModal method to create your modal, feeding it the modal type (that you used
as a key in the modal database), and the ViewContainerRef variable you created in step 2
4. (Optional) Create a function to open your modal using ArcModal's open() method, so that you can open the modal from
a button in the template

```html
<head>
  <!-- Required scripts and styles for modal -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.js"></script>
</head>
<body>
  <!-- Modal placeholder-->
  <template #modalPlaceholder></template>
  <button (click)="openMyCustomModal()">Open Modal</button>
</body>
```

```typescript

import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ModalGeneratorService } from './arc-modal/modal-generator.service'
import { ArcModal } from './arc-modal/arc-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ModalGeneratorService ]
})
export class AppComponent implements OnInit {
  @ViewChild('modalPlaceholder', {read: ViewContainerRef}) private _placeHolder: ViewContainerRef;

  formText : any;
  myCustomModal : ArcModal;

  constructor(private _mgService: ModalGeneratorService, private _vcRef: ViewContainerRef) {}

  ngOnInit() {
    this.myCustomModal = this._mgService.generateModal("myCustomModal", this._placeHolder);
  }

  openMyCustomModal() {
    this.myCustomModal.open();
  }
}
```

### Example: Attaching a callback function to a nested component within the modal, so that it can send data up to the app

Use the ArcModal's attachCallback function.

```typescript

import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { ModalGeneratorService } from './arc-modal/modal-generator.service'
import { ArcModal } from './arc-modal/arc-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ModalGeneratorService ]
})
export class AppComponent implements OnInit {
  @ViewChild('modalPlaceholder', {read: ViewContainerRef}) private _placeHolder: ViewContainerRef;

  formText : any;
  myCustomModal : ArcModal;

  constructor(private _mgService: ModalGeneratorService, private _vcRef: ViewContainerRef) {}

  ngOnInit() {
    this.myCustomModal = this._mgService.generateModal("myCustomModal", this._placeHolder);

    //Using attachCallback to subscribe to changes in nestedComp.data, and send data's changing values to the logOutput function
    this.myCustomModal.attachCallback('nestedComp', 'data', event => logOutput(event));
  }

  openMyCustomModal() {
    this.myCustomModal.open();
  }

  private logOutput(output : any) {
    console.log("App-level logging: " + output);
  }
}

## API

### ModalGenerator Service Methods

- `generateModal (type : string, vcRef : ViewContainerRef) : ArcModal`

  Generates a modal of type 'type' (as defined in arc-modal/modal-generator/modal-database.ts), and injects it into vcRef. Returns the ArcModal object.

### ArcModal Object Methods

- `open()`

  Opens the modal.

- `attachCallBack(component : string, emitter : string, callback : Function)`

  Attaches a callback function to an event emitter within a viewChild component in the ArcModal instance. This is used for when you want your Angular app to process data from components nested within the modal.

- `getInstance() : ComponentRef<any>`

  Returns the ComponentRef containing the instance of the modal.

- `getViewContainerRef() : ViewContainerRef`

  Returns the ViewContainerRef into which the modal was injected upon its creation.

### ModalComponent

#### Inputs

- `animation: boolean`, default: `true`

   Specify `false` to simply show the modal rather than having it fade in/out of view.

- `backdrop: string | boolean`, default: `true`

   Specify `'static'` for a backdrop which doesn't close the modal on click or `false` for no backdrop.

- `keyboard: boolean`, default: `true`

   Closes the modal when escape key is pressed. Specify `false` to disable.

- `size: string`, default: `undefined`

   Specify `'sm'` for small and `'lg'` for large.

- `cssClass: string`, default: `undefined`

   Applies the given class to the modal. Can be used to styles the modal; for example, giving it a custom size.

#### Outputs

- `onClose: EventEmitter`

   Emits when `ModalComponent.close()` is called.

- `onDismiss: EventEmitter`

   Emits when `ModalComponent.dismiss()` is called, or when the modal is dismissed with the keyboard or backdrop.

- `onOpen: EventEmitter`

   Emits when `ModalComponent.open()` is called.

#### Methods

- `open(size?: string): Promise`

   Opens the modal. Size is optional. Specify `'sm'` for small and `'lg'` for large to override size. Returns a promise that resolves when the modal is completely shown.

- `close(value?: any): Promise<any>`

   Closes the modal. Causes `onClose` to be emitted. Returns a promise that resolves the value passed to `close` when the modal is completely hidden.

- `dismiss(): Promise`

   Dismisses the modal. Causes `onDismiss` to be emitted. Returns a promise that resolves when the modal is completely hidden.

### ModalHeaderComponent

#### Inputs

- `show-close: boolean`, default: `false`

   Show or hide the close button in the header. Specify `true` to show.

### ModalFooterComponent

#### Inputs

- `show-default-buttons: boolean`, default: `false`

   Show or hide the default 'Close' and 'Dismiss' buttons in the footer. Specify `true` to show.

- `close-button-label: string`, default: `'Close'`

   Change the label in the default 'Close' button in the footer. Has no effect if show-default-buttons aren't set.

- `dismiss-button-label: string`, default: `'Dismiss'`

   Change the label in the default 'Dismiss' button in the footer. Has no effect if show-default-buttons aren't set.

 ## Example Usage

 ### Default modal

 ```html
 <button type="button" class="btn btn-default" (click)="modal.open()">Open me!</button>

 <modal #modal>
     <modal-header [show-close]="true">
         <h4 class="modal-title">I'm a modal!</h4>
     </modal-header>
     <modal-body>
         Hello World!
     </modal-body>
     <modal-footer [show-default-buttons]="true"></modal-footer>
 </modal>
 ```

 ![Example](demo/images/modal.png)

 ### Static modal

 This will create a modal that cannot be closed with the escape key or by clicking outside of the modal.

 ```html
 <modal #modal [keyboard]="false" [backdrop]="'static'">
     <modal-header [show-close]="false">
         <h4 class="modal-title">I'm a modal!</h4>
     </modal-header>
     <modal-body>
         Hello World!
     </modal-body>
     <modal-footer [show-default-buttons]="true"></modal-footer>
 </modal>
 ```

 ### Use custom buttons in footer

 ```html
 <modal #modal>
     <modal-header>
         <h4 class="modal-title">I'm a modal!</h4>
     </modal-header>
     <modal-body>
         Hello World!
     </modal-body>
     <modal-footer>
         <button type="button" class="btn btn-default" data-dismiss="modal" (click)="modal.dismiss()">Cancel</button>
         <button type="button" class="btn btn-primary" (click)="modal.close()">Ok</button>
     </modal-footer>
 </modal>
 ```

### Modal with a custom size

 ```typescript
 import { Component, ViewChild } from '@angular/core';
 import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

 @Component({
     selector: 'parent-component',
     styles: ['>>> .modal-xl { width: 1100px; }'],
     template: `
         <modal cssClass="modal-xl" #modal>
             ...
         </modal>
     `
 })
 export class ParentComponent {
     ...
 }


 Note: Angular2 emulates the shadow dom by prefixing component styles with a unique identifier. Because the modal is attached to the body tag, it doesn't pick up these styles. You will need to add the `/deep/` or `>>>` selector in order for the style to take effect. See [Component Styles](https://angular.io/docs/ts/latest/guide/component-styles.html#!#-deep-).

### Modal with validation

 ``` html
 <modal #validationModal>
     <form #modalForm="ngForm">
         <modal-header [show-close]="true">
             <h4 class="modal-title">I'm a modal!</h4>
         </modal-header>
         <modal-body>
             <div class="form-group">
                 <label for="firstName">First Name</label>
                 <input type="text" class="form-control" required [(ngModel)]="firstName" name="firstName" id="firstName">
             </div>
             <div class="form-group">
                 <label for="lastName">Last Name</label>
                 <input type="text" class="form-control" required [(ngModel)]="lastName" name="lastName" id="lastName">
             </div>
         </modal-body>
         <modal-footer>
             <button type="button" class="btn btn-default" data-dismiss="modal" (click)="validationModal.dismiss()">Cancel</button>
             <button type="button" class="btn btn-primary" [disabled]="!modalForm.valid" (click)="validationModal.close()">Save</button>
         </modal-footer>
     </form>
 </modal>
 ```

 ### Autofocus on a textbox when modal is opened

 ```html
 <modal #modal>
     <modal-header>
         <h4 class="modal-title">I'm a modal!</h4>
     </modal-header>
     <modal-body>
         <div class="form-group">
             <label for="textbox">I'm a textbox!</label>
             <input autofocus type="text" class="form-control" id="textbox">
         </div>
     </modal-body>
     <modal-footer [show-default-buttons]="true"></modal-footer>
 </modal>
```

# Acknowledgements

The base-modal module used in Arc Modal is `ng2-bs3-modal` created by Doug Ludlow, which can be found at [this repository](https://github.com/dougludlow/ng2-bs3-modal). It was renamed base-modal as part of this project for clarity.

# Sandbox

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
