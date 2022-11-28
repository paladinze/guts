import { User, UserProps } from '../models/user';
import { View } from './view';

export class UserForm extends View<User, UserProps> {
  constructor(public override parent: HTMLElement, public override model: User) {
    super(parent, model);
    this.model.on('change', () => {
      this.render();
    })
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#submit': this.handleSubmit,
      'click:#random-age': this.handleRandomAgeClick
    };
  }

  handleRandomAgeClick = (): void => {
    console.log('set random age');
    this.model.set({
      age: Math.floor(Math.random() * 10 + 1)
    });
  }

  handleSubmit = (): void => {
    console.log('submit');
  };

  override bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let [key, val] of Object.entries(eventsMap)) {
      const [event, selector] = key.split((':'));
      const elements = fragment.querySelectorAll(selector);
      for (let el of Array.from(elements)) {
        el.addEventListener(event, val);
      }
    }
  }

  template(): string {
    return `
    <div>
      <h1>User Form</h1>
      <h2>Username: ${this.model.get('name')}</h2>
      <h2>Age: ${this.model.get('age')}</h2>
      <input />
      <button id='random-age'>randomize age</button>
      <button id='submit' type='submit'>submit</button>
    </div>
    `;
  }

  override render = () => {
    this.parent.innerHTML = '';
    const templateEl = document.createElement('template');
    templateEl.innerHTML = this.template();
    this.bindEvents(templateEl.content);

    this.parent.appendChild(templateEl.content);
  };
}
