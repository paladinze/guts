import { HasId, Model } from '../models/model';

export abstract class View<T extends Model<K>, K extends HasId> {
  constructor(public parent: HTMLElement, public model: T) {
    this.model.on('change', () => {
      this.render();
    })
  }

  abstract eventsMap(): { [key: string]: () => void }
  abstract template(): string

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let [key, val] of Object.entries(eventsMap)) {
      const [event, selector] = key.split((':'));
      const elements = fragment.querySelectorAll(selector);
      for (let el of Array.from(elements)) {
        el.addEventListener(event, val);
      }
    }
  }

  render() {
    this.parent.innerHTML = '';
    const templateEl = document.createElement('template');
    templateEl.innerHTML = this.template();
    this.bindEvents(templateEl.content);

    this.parent.appendChild(templateEl.content);
  }
}
