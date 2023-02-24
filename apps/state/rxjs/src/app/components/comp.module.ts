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
import { CreditCardDirective } from './directive/credit-card.directive';
import { DirectiveComponent } from './directive/directive.component';
import { TooltipDirective } from './directive/tooltip.directive';
import { MyForDirective } from './directive/my-for.directive';
import { ProvidersDemo } from './providers/providers-demo';
import { token1, token2 } from './providers/injection-tokens';
import { FooService } from './providers/foo.service';
import { BarService } from './providers/bar.service';

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
    CreditCardDirective,
    DirectiveComponent,
    TooltipDirective,
    MyForDirective,
    ProvidersDemo
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    { provide: 'configA', useValue: 'configA value' },
    { provide: token1, useValue: 'configA token 1' },
    { provide: token2, useValue: 'configA token 2' },
    { provide: FooService, useClass: FooService },
    {
      provide: BarService,
      useFactory: (fooService: FooService) => {
        return new BarService(fooService, 'BarService: this is bar!');
      },
      deps: [FooService]
    },
  ],
  exports: [
    DynamicComp,
    FormPage,
    TemplateComp,
    EmulatedComponent,
    ShadowComponent,
    GlobalComp,
    ChangeDetectionComponent,
    DirectiveComponent,
    ProvidersDemo
  ]
})
export class CompModule {
}
