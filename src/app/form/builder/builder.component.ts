import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { IOptionInfoForm } from '../interfaces/option-info';
import { QuestionsService } from '../services/questions.service';
import { AddNewQuestionsComponent } from './add-new-questions/add-new-questions.component';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AddNewQuestionsComponent],
  templateUrl: './builder.component.html',
})
export class BuilderComponent implements OnInit {
  isAddNewQuestions = false;

  rf = this.fb.group({
    forms: this.fb.array([]),
  });

  constructor(
    private questionService: QuestionsService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.questionService.formQuestion$.subscribe((data) => {
      if (data.length) {
        data.forEach((val) => {
          this.newQuestion(val);
        });
      }
    });
  }

  questions() {
    return this.rf.get('forms') as FormArray;
  }

  newQuestion(question: IOptionInfoForm) {
    let newForm = this.fb.group({
      title: [question.title],
      answersTextBox: [question.answersTextBox],
      multipleAnswer: [question.multipleAnswer],
      answers: this.fb.array([]),
    });

    question.answers.forEach((a) => {
      const answer = this.fb.group({
        answer: a.answer ?? '',
        chose: a.chose ?? false,
      });
      newForm.controls['answers'].push(answer as any);
    });

    this.questions().push(newForm);
  }

  getMultipleAnswer(index: number) {
    return this.questions().at(index).get('multipleAnswer')?.value;
  }

  formsAnswers(empIndex: number): FormArray {
    return this.questions().at(empIndex).get('answers') as FormArray;
  }

  toggleForm() {
    this.isAddNewQuestions = !this.isAddNewQuestions;
  }

  addNewQuestions(question: IOptionInfoForm) {
    this.newQuestion(question);
  }

  reviewQuestion() {
    const forms = this.rf.value.forms;
    this.questionService.saveFormQuestion(forms as any);
    this.route.navigateByUrl('form/answer');
  }
}
