// signup-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit{
    user: FormGroup;
    ngOnInit() {
      this.user = new FormGroup({
        name: new FormControl(''),
        account: new FormGroup({
          email: new FormControl(''),
          confirm: new FormControl('')
        })
      });
    }
}