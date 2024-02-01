import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'formArray';

  form!: FormGroup
  formOption = [
    {name: 'user one'},
    {name: 'user two'},
    {name: 'user three'},
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      users: this.fb.array([])
    })

    this.users.valueChanges.subscribe(value => {
      console.log(value)
    })
  }
  get users() {
    return this.form.get('users') as FormArray;
  }
  add() {
    const userForm = this.fb.group({
      user: ['', Validators.required]
    })
    this.users.push(userForm)
  }
  getFormControls(index: number) {
    return (this.users.controls[index] as FormGroup).controls;
  }
}
