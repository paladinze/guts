import { Component } from '@angular/core';

@Component({
  selector: 'emulated-comp',
  styles: [`
    .emulated-comp {
      background: #9f72e6;
      font-size: 19px;
      color: #fff;
      margin-bottom: 50px;
      padding: 10px 20px;
    }
  `],
  template: `
    <div class="emulated-comp">
      emulated comp
    </div>
  `
})
export class EmulatedComponent {

}
