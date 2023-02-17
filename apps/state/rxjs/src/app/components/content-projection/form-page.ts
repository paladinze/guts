import {
  AfterContentInit,
  AfterViewInit,
  Component,
} from '@angular/core';
import { User } from './auth-form.interface';


@Component({
  selector: 'form-page',
  template: `
    <div>
      <auth-form
        (submitted)='createUser($event)'>
        <h4>form 1: create account</h4>
        <auth-remember
          (checked)='rememberUser($event)'>
        </auth-remember>
        <auth-remember
          (checked)='rememberUser($event)'>
        </auth-remember>
        <button type='submit'>
          sign up
        </button>
      </auth-form>
      <auth-form
        (submitted)='loginUser($event)'>
        <h4>form 2: Login</h4>
        <button type='submit'>
          login
        </button>
      </auth-form>

    </div>
  `
})
export class FormPage implements AfterViewInit, AfterContentInit {

  private shouldRememberUser = false;

  constructor() {

  }

  ngAfterContentInit() {
  }

  ngAfterViewInit() {
  }

  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

  rememberUser(event: boolean) {
    this.shouldRememberUser = event;
  }
}
