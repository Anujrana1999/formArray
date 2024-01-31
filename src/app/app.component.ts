import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'formArray';
  form = this.fb.group({
    lessons: this.fb.array([])
  });
  formOptions = [
    { value: 'one', name: 'one' },
    { value: 'two', name: 'two' },
    { value: 'three', name: 'three' }
  ]
  currentVal: string[] = [];
  constructor(private fb: FormBuilder) { }

  get lessons() {
    return this.form.controls['lessons'] as any;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      level: ['', Validators.required],
    });

    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
    this.currentVal.splice(lessonIndex, 1)[0];
  }

  current({ target }: any) {
    if (!this.currentVal.includes(target.value)) {
      this.currentVal.push(target.value);
    }
  }

}
