import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'change-detection-comp',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <div>
      <button (click)='addProp()'>Add property</button>
      <button (click)='changeName()'>Change name property</button>
      <button (click)='changeUser()'>Change user object</button>
      <div class='users'>
        <h4>onpush strategy</h4>
        <onpush-comp [user]='user'></onpush-comp>
        <h4>default strategy</h4>
        <default-change-comp [user]='user'></default-change-comp>
      </div>
    </div>
  `
})
export class ChangeDetectionComponent {
  user: any = {
    name: 'Mark Hoppus',
    age: 44,
    location: 'California'
  };

  addProp() {
    this.user.email = 'temp@temp.com';
  }

  changeName() {
    this.user.name = 'Travis Barker';
  }

  changeUser() {
    this.user = {
      name: 'Tom Delonge',
      age: 41,
      location: 'California'
    };
  }
}
