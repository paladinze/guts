import { Component } from '@angular/core';
// import './rxjs-demo/lifecycle'
// import './rxjs-demo/cancel-subscription'
// import './rxjs-demo/cold-and-hot'
import './rxjs-demo/operators'

@Component({
  selector: 'guts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'state-rxjs';

  constructor() {
  }
}
