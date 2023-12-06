import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IOptionInfoForm } from '../../interfaces/option-info';

@Component({
  selector: 'app-add-new-questions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-questions.component.html',
})
export class AddNewQuestionsComponent {
  @Output() toggleForm = new EventEmitter();
  @Output() newQuestion = new EventEmitter<IOptionInfoForm>();

  isMultiAnswers = false;
  rf = this.fb.group({
    title: [''],
    multipleAnswer: [false],
    answers: this.fb.array([]),
    answersTextBox: [''],
    allow: [false],
    required: [false],
  });

  constructor(private fb: FormBuilder) {
    this.rf.controls['multipleAnswer'].valueChanges.subscribe(() => {
      this.isMultiAnswers = !this.isMultiAnswers;
      if (!this.isMultiAnswers) {
        this.answers.clear();
      }
    });
  }

  hideForm() {
    this.toggleForm.emit();
  }

  get answers() {
    return this.rf.get('answers') as FormArray;
  }

  addAnswers() {
    if (this.answers.length >= 5) return;
    const answerForm = this.fb.group({
      answer: '',
      chose: false,
    });

    this.answers.push(answerForm);
  }

  deleteAnswer(index: number) {
    this.answers.removeAt(index);
  }

  submit() {
    this.newQuestion.emit(<IOptionInfoForm>this.rf.value);
    this.hideForm();
  }
}
