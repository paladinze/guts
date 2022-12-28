import { Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'guts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'state-rxjs';

  constructor() {
    of(1,2,3).subscribe(console.log)
  }
}
