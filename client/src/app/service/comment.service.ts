import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http'
import { Globals } from '../globals';

@Injectable()
export class CommentService {

  constructor(
    private http: HttpClient
  ) { 
    
  }


  addComment(payload) {
    return this.http.post(Globals.AddCommentAPI, payload);
  }
}
