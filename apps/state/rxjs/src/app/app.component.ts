import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
// import './rxjs-demo/lifecycle'
// import './rxjs-demo/cancel-subscription'
// import './rxjs-demo/cold-and-hot'
// import './rxjs-demo/creation-operators'
// import './rxjs-demo/countdown-timer'
// import './rxjs-demo/filtering';
import './rxjs-demo/transform-operators'
import {
  asyncScheduler,
  filter,
  fromEvent,
  map,
  mergeAll,
  mergeMap,
  Observable,
  observeOn,
  of,
  subscribeOn,
  tap
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import './basic-store';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'guts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'state-rxjs';

  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  constructor(private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      console.log(event)
    })
  }

  handleDeactivate(event: any) {
    console.log('deactivate', event)
  }

  handleActivate(event: any) {
    console.log('activate', event)
  }

  ngAfterViewInit(): void {
    of(1,2,3).pipe(
      tap((val) => {console.log('tap', val)}),
      subscribeOn(asyncScheduler, 3000)
    ).subscribe(console.log)


    const name$ = fromEvent(this.nameInput.nativeElement, 'keyup') as Observable<InputEvent>;
    name$.pipe(
      mergeMap(event => {
        const value = (event.target as HTMLInputElement).value;
        return ajax.getJSON(
          `https://api.github.com/users/${value}`
        );
      }),
    ).subscribe((val) => {
      console.log(val);
    });
  }

}
