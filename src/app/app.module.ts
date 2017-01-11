import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { Ng2Bs3ModalModule } from './ng2-bs3-modal/ng2-bs3-modal';
import { ModalTestFormComponent } from './modal-test-form/modal-test-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    ModalTestFormComponent
  ],
  imports: [
    Ng2Bs3ModalModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
