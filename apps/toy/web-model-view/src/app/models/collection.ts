import { Events } from './events';


export class Collection<T, D> {

  models: T[] = [];
  events: Events = new Events();

  constructor(
    public rootUrl: string,
    public deserializer: (json: D) => T,
  ) {
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const response = await fetch(this.rootUrl);
    const rawData: D[] = await response.json();
    this.models = rawData.map(item => this.deserializer(item));

    this.trigger('change');
  }
}
