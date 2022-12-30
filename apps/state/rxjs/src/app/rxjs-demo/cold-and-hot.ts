import { ajax, AjaxResponse } from 'rxjs/ajax';

console.log('cold observable')

ajax('https://random-data-api.com/api/v2/users?size=1').subscribe({
  next: (data: AjaxResponse<any>) => console.log(data.response.username)
})

ajax('https://random-data-api.com/api/v2/users?size=1').subscribe({
  next: (data: AjaxResponse<any>) => console.log(data.response.username)
})

console.log('hot observable')
//
// const helloButton = document.querySelector('button#hello');
//
// const helloClick$ = new Observable<MouseEvent>(subscriber => {
//   helloButton.addEventListener('click', (event: MouseEvent) => {
//     subscriber.next(event);
//   });
// });
//
// helloClick$.subscribe(
//   event => console.log('Sub 1:', event.type, event.x, event.y)
// );
//
// setTimeout(() => {
//   console.log('Subscription 2 starts');
//   helloClick$.subscribe(
//     event => console.log('Sub 2:', event.type, event.x, event.y)
//   );
// }, 5000);
//
//
