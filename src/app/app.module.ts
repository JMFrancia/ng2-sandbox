import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { BaseModalModule } from './arc-modal/base-modal/base-modal';
import { ModalTestFormComponent } from './modal-test-form/modal-test-form.component';
import { WizardModalComponent } from './arc-modal/wizard-modal/wizard-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    ModalTestFormComponent,
    WizardModalComponent
  ],
  imports: [
    BaseModalModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ AppComponent, WizardModalComponent ]
})
export class AppModule {}
