import {
  Component,
  Output,
  EventEmitter,
  ContentChild,
  AfterContentInit,
  ContentChildren,
  QueryList
} from '@angular/core';

import { User } from './auth-form.interface';
import { AuthRememberComponent } from './auth-remember.component';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <ng-content select='h4'></ng-content>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <label>
          Email address
          <input type="email" name="email" ngModel>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select='auth-remember'></ng-content>
        <div *ngIf='showRememberMessage'>You will be forever remembered!</div>
        <ng-content select='button'></ng-content>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit {

  showRememberMessage = false;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  // @ContentChild(AuthRememberComponent) rememberComp: AuthRememberComponent;
  @ContentChildren(AuthRememberComponent) rememberComps: QueryList<AuthRememberComponent>;

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

  ngAfterContentInit(): void {
    // if (this.rememberComp) {
    //   this.rememberComp.checked.subscribe((value) => {
    //     this.showRememberMessage = value;
    //   });
    // }
    this.rememberComps.forEach(comp => {
      comp.checked.subscribe((value) => {
        this.showRememberMessage = value;
      })
    })
  }


}
