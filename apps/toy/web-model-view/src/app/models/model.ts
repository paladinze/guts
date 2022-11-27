
export type Callback = () => void;

interface HasId {
  id: number
}

interface ModelAttributes<T> {
  set(value: Partial<T>): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): Promise<T>;
  save(data: T): Promise<Response>;

}

interface Events {
  on(eventName: string, cb: Callback): void;
  trigger(eventName: string): void;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {


  }

  get get() {
    return this.attributes.get;
  }

  set(payload: Partial<T>): void {
    this.attributes.set(payload);
    this.events.trigger('change');
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch() {
    const id = this.get('id');

    const data = await this.sync.fetch(id);
    this.set(data);
  }

  async save(): Promise<void> {
    const localData = this.attributes.getAll();
    await this.sync.save(localData);
    this.trigger('save');
  }
}
