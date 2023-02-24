import { Inject, Injectable } from '@angular/core';
import { FooService } from './foo.service';


@Injectable()
export class BarService {
  constructor(private fooService: FooService,
              @Inject(String) private msg: string) {
  }

  getMsg() {
    return `useFactory provider: ${this.fooService.getMsg()} | ${this.msg}`;
  }


  specialPower() {
    return 'useExisting provider: close myself like a turing box';
  }


}
