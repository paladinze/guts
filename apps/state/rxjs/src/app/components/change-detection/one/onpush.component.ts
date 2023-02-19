import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../user.interface';

@Component({
  selector: 'onpush-comp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  `],
  template: `
    <div class='onpush-comp'>
      <div>{{ user.name }}</div>
      <div>{{ user.age }} years old</div>
      {{ user.location }} <br />
      {{ user.email }}

      <button (click)='update()'>Internal update</button>
      <p>* should not update</p>
    </div>
  `
})
export class OnpushComponent {
  @Input() user: User;

  update() {
    this.user.name = 'Matt Skiba';
  }
}
