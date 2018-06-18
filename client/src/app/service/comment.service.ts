import { Injectable } from '@angular/core';
import { Comment } from '../model/Comment';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  serverUrl: string = "http://localhost:8080";
  constructor(
    private http: HttpClient
  ) { }


  addComment() {
    return this.http.get(this.serverUrl + '/add/comment');
  }

  removeComment() {
    return this.http.get(this.serverUrl + '/remove/comment');
  }
}
