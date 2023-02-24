import { Injectable } from '@angular/core';


@Injectable()
export class FooService {
  constructor() {
  }

  getMsg() {
   return 'FooService: this is foo!'
  }


}
