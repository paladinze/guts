import { Component } from '@angular/core';

@Component({
  selector: 'directive-comp',
  template: `
    <h4>custom structural directive</h4>
    <ng-template myFor [myForOf]='items' let-item let-index="index">
      <li>value: {{item}} | index: {{index}}</li>
    </ng-template>

    <h4>attribute directive</h4>
    <div
      tooltip='this is a tooltip from directive'
      #myTooltip='tooltip'
    >
      <label>
        <div
          (mouseover)='myTooltip.show()'
          (mouseout)='myTooltip.hide()'
        >Credit Card Number (*)</div>
        <input
          name='credit-card'
          type='text'
          placeholder='Enter your 16-digit card number'
          credit-card>
      </label>
    </div>
  `
})
export class DirectiveComponent {

  items = [1,2,3];

  constructor() {
    setTimeout(() => {
      this.items = [...this.items, 4]
    }, 2000)
  }
}
