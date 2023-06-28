// signup-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'skill-item',
  templateUrl: './skill-item.component.html'
})
export class SkillItemComponent implements OnInit{
  userForm: FormGroup;

  @Input() formControl: FormControl;

  ngOnInit() {}

}