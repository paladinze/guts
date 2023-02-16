import { from, fromEvent, interval, of, timer } from 'rxjs';


export const createObFromPromise = () => {
  const p = new Promise((resolve, reject) => {
    resolve(10);
  });
  return from(p);
};
createObFromPromise().subscribe({ next: console.log });

export const createObFromSequence = () => {
  return of('Alice', 'Ben', 'Charlie');
};

createObFromSequence().subscribe({ next: console.log });

export const createFromDomEvent = () => {
  return fromEvent(document, 'click');
};

createFromDomEvent().subscribe(() => {
  console.log('document click');
});

interval(1000).subscribe(() => {
  console.log('interval')
});

timer(3000, 1000).subscribe(() => {
  console.log('timer')
});
