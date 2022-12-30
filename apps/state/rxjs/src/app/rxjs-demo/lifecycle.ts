import { Observable } from 'rxjs';

const events$ = new Observable<string>(subscriber => {
  subscriber.next('1');
  subscriber.next('2');
  setTimeout(() => {
    subscriber.next('3');
    subscriber.complete();
  }, 1000);

  setTimeout(() => {
    subscriber.error();
  }, 500);

  return () => {
    console.log('Teardown');
  };
});

events$.subscribe({
  next: (value) => console.log('sub1: ' + value),
  complete: () => console.log('sub1: completed'),
  error: console.error
});

