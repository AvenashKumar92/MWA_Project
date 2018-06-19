import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  serverUrl: string = "http://localhost:8080/auth";
  constructor(
    private http: HttpClient
  ) {

  }


  getsubscribeQuestions() {
    return this.http.get(this.serverUrl + '/subscribed/questions');
  }

  addQuestion(question) {
    return this.http.post(Globals.AddQuestionAPI, question);
  }

  removeQuestion(question) {
    return this.http.get(this.serverUrl + '/remove/question');
  }

}
