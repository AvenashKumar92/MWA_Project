import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Post, PostMaker } from '../model/Post';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuestionService } from '../service/question.service';
import {AuthService} from '../service/auth.service'
import { Router } from '@angular/router';

import {
  MatTableDataSource
} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private questions;
  constructor(private questionService: QuestionService, public dialog: MatDialog,
    private auth: AuthService, 
    private router: Router) {
    this.questions = this.questionService.getsubscribeQuestions();
  }

  onLogOut(){
    console.log('HomeComponent: Application logout.......');
    this.auth.logout();
  }

  displayedColumns = ['title'];
  dataSource = new PostDataSource(this.questionService);

  openDialog() {

    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Discussion'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.questionService.addQuestion(result);
      this.dataSource = new PostDataSource(this.questionService);
    });
  }
}

export class PostDataSource extends DataSource<any> {

  constructor(private questionService: QuestionService) {
    super();
  }

  ngOnInit() {

  }
  connect(): Observable<String[]> {
    let posts: String[];
    posts = ['asd', 'asdsad'];
    this.questionService.getsubscribeQuestions().subscribe(
      (data: any) => {


        let uquestion: any

        for (uquestion in data.questions) {
          let singlePost: Post;
          let question: any;

          for (question in data.questions[uquestion].questions) {


            /*singlePost.comments = data.questions[uquestion].questions[question].comment;
            singlePost.topics = data.questions[uquestion].questions[question].topics;
            singlePost.question = data.questions[uquestion].questions[question].question;*/

            posts.push(data.questions[uquestion].questions[question].question)
          }
          //posts.push(singlePost);
        }
        console.log(posts);
        return Observable.of<String[]>(posts);
      }
    );
    return Observable.of<String[]>(posts);
  }



  disconnect() {
  }
}
