import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'global-comp',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .shadow-comp {
      border: 5px solid hotpink;
    }
  `],
  template: `
    <div class="shadow-comp">
      global
    </div>
  `
})
export class GlobalComp {

}
