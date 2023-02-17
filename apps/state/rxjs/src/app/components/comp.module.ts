import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicComp } from './dynamic-component/dynamic-comp';
import { AuthRememberComponent } from './content-projection/auth-remember.component';
import { FormPage } from './content-projection/form-page';
import { AuthFormComponent } from './content-projection/auth-form.component';
import { DumbComponent } from './dynamic-component/dumb-component';

@NgModule({
  declarations: [
    DynamicComp,
    AuthFormComponent,
    FormPage,
    AuthRememberComponent,
    DumbComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DynamicComp,
    FormPage
  ]
})
export class CompModule {
}
