export interface IOptionInfoForm {
  title: string;
  multipleAnswer?: boolean;
  answers: Answer[];
  answersTextBox: string;
  allow?: boolean
  required?: boolean
}

export interface Answer {
  answer: string;
  chose: boolean;
}
