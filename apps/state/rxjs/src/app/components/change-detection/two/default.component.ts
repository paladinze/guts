import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../user.interface';

@Component({
  selector: 'default-change-comp',
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [`
  `],
  template: `
    <div class="default-change-comp">
      <div>{{ user.name }}</div>
      <div>{{ user.age }} years old</div>
      {{ user.location }} <br />
      {{ user.email }}

      <button (click)="update()">Internal update</button>
      <p>* should update</p>
    </div>
  `
})
export class DefaultChangeComponent {
  @Input()
  user: User;

  update() {
    this.user.name = 'Scott Raynor';
  }
}
