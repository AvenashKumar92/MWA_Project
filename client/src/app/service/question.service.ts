import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  serverUrl: string = "http://localhost:8080";
  constructor(
    private http: HttpClient
  ) {

  }


  getsubscribeQuestions() {
    return this.http.get(this.serverUrl + '/subscribed/questions');
  }

  addQuestion() {
    return this.http.get(this.serverUrl + '/add/question');
  }

  removeQuestion() {
    return this.http.get(this.serverUrl + '/remove/question');
  }

}
