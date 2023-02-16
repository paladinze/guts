import { filter, interval, map, mapTo, scan } from 'rxjs';


interval(1000)
  .pipe(
    map(item => -1),
    scan((acc, curr) => {
      return acc + curr
    }, 10),
    filter(item => item >= 0)
  ).subscribe((val) => {
    console.log(val)
})
