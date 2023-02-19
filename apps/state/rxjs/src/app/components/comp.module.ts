import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicComp } from './dynamic-component/dynamic-comp';
import { AuthRememberComponent } from './content-projection/auth-remember.component';
import { FormPage } from './content-projection/form-page';
import { AuthFormComponent } from './content-projection/auth-form.component';
import { DumbComponent } from './dynamic-component/dumb-component';
import { TemplateComp } from './template/template-comp';
import { EmulatedComponent } from './view-encapsulation/emulated.component';
import { ShadowComponent } from './view-encapsulation/shadow.component';
import { GlobalComp } from './view-encapsulation/global.component';
import { ChangeDetectionComponent } from './change-detection/change-detection.component';
import { DefaultChangeComponent } from './change-detection/two/default.component';
import { OnpushComponent } from './change-detection/one/onpush.component';

@NgModule({
  declarations: [
    DynamicComp,
    AuthFormComponent,
    FormPage,
    AuthRememberComponent,
    DumbComponent,
    TemplateComp,
    EmulatedComponent,
    ShadowComponent,
    GlobalComp,
    DefaultChangeComponent,
    OnpushComponent,
    ChangeDetectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DynamicComp,
    FormPage,
    TemplateComp,
    EmulatedComponent,
    ShadowComponent,
    GlobalComp,
    ChangeDetectionComponent
  ]
})
export class CompModule {
}
