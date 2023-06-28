// signup-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit{
  userForm: FormGroup;

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      account: new FormGroup({
        email: new FormControl(''),
        confirm: new FormControl('')
      }),
      skillsArray: new FormArray([]),
    });

    this.addSkill()
    this.addSkill()
    this.addSkill()
  }

  get skillsArray() {
    return this.userForm.controls['skillsArray'] as FormArray
  }

  get skillControls() {
    return this.skillsArray.controls as FormControl[]
  }

  addSkill() {
    this.skillsArray.push(new FormControl(''))
  }
}