import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    let header = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsYWluMTIzQG11bS5lZHUiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWF0IjoxNTI5MzYxMTQyfQ.3mj8fSF1Oua7xcSQ5TPVVWDK2cSMOxu1GUTv2zKX14c');

    return this.http.get(this.serverUrl + '/subscribed/questions', { headers: header });
  }

  addQuestion(question) {
    return this.http.get(this.serverUrl + '/add/question');
  }

  removeQuestion(question) {
    return this.http.get(this.serverUrl + '/remove/question');
  }

}
