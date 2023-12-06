import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BuilderComponent } from './form/builder/builder.component';
import { AnswersComponent } from './form/answers/answers.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, BuilderComponent, AnswersComponent],
})
export class AppComponent {}
