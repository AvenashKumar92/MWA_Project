import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable()
export class QuestionService {
  constructor(
    private http: HttpClient
  ) {

  }


  getSubscribeQuestions() {
    return this.http.get(Globals.SubscribedQuestionsAPU);
  }

  addQuestion(question) {
    return this.http.post(Globals.AddQuestionAPI, question);
  }
}
