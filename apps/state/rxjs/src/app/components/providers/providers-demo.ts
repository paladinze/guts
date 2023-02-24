import { Component, Inject } from '@angular/core';
import { CUSTOM_MODULE_CONFIG, token1, token2 } from './injection-tokens';
import { BarService } from './bar.service';
import { CustomModuleConfig } from '../comp.module';

export abstract class SpecialService {
  specialPower: () => string;
}


@Component({
  selector: 'providers-demo',
  template: `
    <div>{{configAText}}</div>
    <div>{{configA1}}</div>
    <div>{{configA2}}</div>
    <div>{{fooMsg}}</div>
    <div>{{specialMsg}}</div>
    <div>{{moduleMsg}}</div>
  `,
  providers: [
    {provide: SpecialService, useExisting: BarService}
  ]
})
export class ProvidersDemo {
  fooMsg: string;
  specialMsg: string;

  moduleMsg: string;

  constructor(
    @Inject('configA') public configAText: string,
    @Inject(token1) public configA1: string,
    @Inject(token2) public configA2: string,

    private barService: BarService,
    private specialService: SpecialService,
    @Inject(CUSTOM_MODULE_CONFIG) private moduleConfig: CustomModuleConfig,
  ) {
    this.fooMsg = barService.getMsg();
    this.specialMsg = specialService.specialPower();

    this.moduleMsg = moduleConfig.name;
  }


}
