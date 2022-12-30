import { from, of } from 'rxjs';


export const createObFromPromise = () => {
  const p = new Promise((resolve, reject) => {
    resolve(10);
  })
  return from(p)
}
createObFromPromise().subscribe({ next: console.log })

export const createObFromSequence = () => {
  return of('Alice', 'Ben', 'Charlie')
}

createObFromSequence().subscribe( {next: console.log})
