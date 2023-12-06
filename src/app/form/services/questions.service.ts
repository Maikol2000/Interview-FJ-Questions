import { Injectable } from '@angular/core';
import { IOptionInfoForm } from '../interfaces/option-info';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  formQuestion$ = new BehaviorSubject<IOptionInfoForm[] | []>([]);
  constructor() {}

  saveFormQuestion(data: IOptionInfoForm[]) {
    this.formQuestion$.next(data);
  }

  enterAnswer(questionIndex: number, answerIndex?: number, answer?: string) {
    const formQuestion = this.formQuestion$.value;
    const mapQuestion = formQuestion.map((q, qInx) => {
      if (qInx == questionIndex) {
        q.answers.map((a, aIdx) => {
          if (aIdx == answerIndex) {
            if (!answer) {
              a.chose = true;
            } else {
              a.answer = answer;
            }
          }
          console.log({ a });
          return a;
        });
      }
      return q;
    });

    console.log({ mapQuestion });
  }
}
