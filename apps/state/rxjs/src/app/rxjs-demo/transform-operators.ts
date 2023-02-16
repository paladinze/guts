import { fromEvent, interval, mergeMap, takeUntil } from 'rxjs';


function createMergeMap() {
  const interval$ = interval(1000);
  const mousedown$ = fromEvent(document, 'mousedown');
  const mouseup$ = fromEvent(document, 'mouseup');

  mousedown$.pipe(
    mergeMap(() => {
      return interval$.pipe(takeUntil(mouseup$));
    })
  ).subscribe((value) => {
    console.log(value);
  })
}

createMergeMap();
