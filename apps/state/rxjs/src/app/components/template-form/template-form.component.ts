// signup-form.component.ts
import { Component } from '@angular/core';


export interface User {
    name: string;
    account: {
      email: string;
      confirm: string;
    }
  }

@Component({
  selector: 'template-form',
  templateUrl: './template-form.component.html'
})
export class TemplateFormComponent {
  constructor() {}

  onSubmit({ value, valid }: { value: User, valid: boolean | null }) {
    console.log(value, valid);
  }
}