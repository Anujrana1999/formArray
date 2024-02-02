import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

interface formOption {
  id: string,
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'formArray';

  form!: FormGroup;
  formOption: formOption[] = [
    { id: '1', name: 'user one' },
    { id: '2', name: 'user two' },
    { id: '3', name: 'user three' },
  ];
  filterFormOption: formOption[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      users: this.fb.array([])
    })

    this.users.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(value => {
      this.filterFormOption = this.formOption.filter(res => {
        debugger;
        if (value[0].user) {
          return res.id !== value[0].user;
        } else {
          return res;
        }
      })
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
