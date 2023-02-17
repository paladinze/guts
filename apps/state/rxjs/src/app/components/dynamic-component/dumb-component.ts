import { Component } from '@angular/core';

@Component({
  selector: 'dumb-component',
  template: `
    <div>
      {{message}}
    </div>
  `
})
export class DumbComponent {

  message = 'I will be dynamically generated';

}
