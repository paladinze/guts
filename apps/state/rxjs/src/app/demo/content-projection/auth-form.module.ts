import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthFormComponent } from './auth-form.component';
import { FormPage } from './form-page';
import { AuthRememberComponent } from './auth-remember.component';

@NgModule({
  declarations: [
    AuthFormComponent,
    FormPage,
    AuthRememberComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormPage
  ]
})
export class AuthFormModule {}
