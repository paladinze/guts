import { Component } from '@angular/core';

@Component({
  selector: 'directive-comp',
  template: `
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
}
