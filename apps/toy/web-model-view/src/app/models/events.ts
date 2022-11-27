import { Callback } from './model';


export class Events {
  events: { [name: string]: Callback[] } = {};

  constructor() {
  }

  on = (eventName: string, cb: Callback): void => {
    if (this.events[eventName] === undefined) {
      this.events[eventName] = [cb];
    } else {
      this.events[eventName].push(cb);
    }
  }

  trigger = (eventName: string): void => {
    const cbs = this.events[eventName];
    if (!cbs) return;
    cbs.forEach(cb => {
      cb();
    });
  }
}
