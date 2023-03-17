import {
  AfterContentInit,
  AfterViewInit,
  Component,
} from '@angular/core';
import { User } from './auth-form.interface';


@Component({
  selector: 'form-page',
  templateUrl: './form-page.template.html' 
})
export class FormPage implements AfterViewInit, AfterContentInit {


  myDynamicClass = 'myDynamicClass';

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
