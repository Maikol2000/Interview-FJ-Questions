import { Routes } from '@angular/router';
import { BuilderComponent } from './form/builder/builder.component';
import { AnswersComponent } from './form/answers/answers.component';

export const routes: Routes = [
  {
    path: 'form/builder',
    component: BuilderComponent,
  },
  {
    path: 'form/answer',
    component: AnswersComponent,
  },
  {
    path: '',
    redirectTo: '/form/builder',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: BuilderComponent
  },
];
