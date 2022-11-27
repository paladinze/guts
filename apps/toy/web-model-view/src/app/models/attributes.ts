
export class Attributes<T> {
  constructor(private data: T) {

  }

  get = <K extends keyof  T>(propName: K): T[K] => {
    return this.data[propName];
  }

  set = (payload: Partial<T>): void => {
    Object.assign(this.data, payload);
  }

  getAll = (): T => {
    return this.data;
  }
}
