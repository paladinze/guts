import { Observable } from 'rxjs';


const events$ = new Observable((subscriber => {
  const timer = setInterval(() => {
    subscriber.next('emmit event');
  }, 1000);

  return () => {
    clearInterval(timer)
  }
}));

const sub = events$.subscribe({
  next: console.log
});

setTimeout(() => {
  console.log('unsub');
  sub.unsubscribe()
},3000)
