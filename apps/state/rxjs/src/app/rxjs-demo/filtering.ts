import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  first,
  from,
  fromEvent,
  interval,
  map, Observable,
  of,
  scan,
  takeUntil
} from 'rxjs';

function demoFirst() {
  const click$ = fromEvent(document, 'click');
  click$
    .pipe(
      map((event: any) => ({
        x: event.clientX,
        y: event.clientY
      })),
      // first(),
      // like filter(condition), take(1)
      first(({ y }) => y > 400)
    )
    .subscribe({
      next: console.log,
      complete: () => console.log('Complete!')
    });

}


function demoTakeUntil() {
  const counter$ = interval(1000);
  const abort$ = fromEvent(document, 'click');

  counter$.pipe(
    takeUntil(abort$)
  ).subscribe((val) => {
    console.log(val);
  });
}


type User = { name: string, loggedIn: boolean};
function demoDistinctUntilChanged() {
  // const numbers$ = of(1, '1', 2, 3, 3, 3, 3, 5, 3);
  // numbers$.pipe(distinctUntilChanged()).subscribe(console.log);

  const user: User[] = [
    { name: 'terran', loggedIn: false },
    { name: 'terran', loggedIn: true },
    { name: 'terran', loggedIn: true }
  ];

  const state$ = from(user).pipe(
    scan((accumulator, currentValue) => {
      return { ...accumulator, ...currentValue };
    }, {} as User)
  );

  const name$ = state$.pipe(
    distinctUntilKeyChanged('name'),
    map((state) => state.name)
  );

  name$.subscribe(console.log);
}

// demoTakeUntil();
demoDistinctUntilChanged();
