import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'shadow-comp',
  encapsulation: ViewEncapsulation.ShadowDom,
  styles: [`
    .shadow-comp {
      background: #9f72e6;
      font-size: 19px;
      color: #fff;
      margin-bottom: 10px;
      padding: 5px 7px;
    }
  `],
  template: `
    <div class="shadow-comp">
      shadow dom comp
    </div>
    <emulated-comp></emulated-comp>
  `
})
export class ShadowComponent {

}
