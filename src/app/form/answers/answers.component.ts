import { Component } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { BehaviorSubject } from 'rxjs';
import { IOptionInfoForm } from '../interfaces/option-info';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './answers.component.html',
})
export class AnswersComponent {
  questions$ = new BehaviorSubject<IOptionInfoForm[]>([]);

  constructor(private questionService: QuestionsService) {
    console.log(this.questionService.formQuestion$.value);
    this.questions$.next(this.questionService.formQuestion$.value);
  }
}
