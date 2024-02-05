import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'formArray';

  form!: FormGroup;
  formOption = [
    { id: '1', name: 'user one' },
    { id: '2', name: 'user two' },
    { id: '3', name: 'user three' },
  ];
  filterFormOption: any[] = [];

  constructor(private fb: FormBuilder) { }

  get users() {
    return this.form.get('users') as FormArray;
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      users: this.fb.array([])
    })

    this.users.valueChanges.pipe(
      startWith([])
    ).subscribe(value => {
      debugger
      if (!!this.users?.value?.length) {
        this.users.value.forEach((element: any, index: any) => {
          const allSelectedOptions = this.users.value.map((elem: any) => elem.user);
          this.filterFormOption[index] = [
            ...this.formOption.filter((elm: any) => !allSelectedOptions.includes(elm.id) || elm.id == element.user)
          ]
        });
      }
    })
  }
  add() {
    const userForm = this.fb.group({
      user: ['', Validators.required]
    })
    this.users.push(userForm)
  }
}
