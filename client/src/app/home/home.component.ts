import { Component, OnInit, Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { QuestionService } from '../service/question.service';
import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router';
import {
  MatTableDataSource
} from '@angular/material';
import { Globals } from '../globals';
import { CommentService } from '../service/comment.service';


class Question {
  public topics;
  public comments;
  public fname;
  public lname;
  constructor(public email, public question) {

  }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  panelOpenState: boolean = false;
  private questions: Question[] = [];
  post = {
    question: '',
    description: '',
    topics: [],
    comments:[]
  };

  constructor(private questionService: QuestionService, 
    private commentService:CommentService, 
    public dialog: MatDialog,
    private auth: AuthService) {

  }

  onKeyDown(event){
    if(event.key==="Enter"){
      let comment=event.target.value;
      if(comment){
        console.log('HomeComponent: Received new comment......');
        let question=event.target.name;
        console.log('HomeComponent: Updating post......');
        this.addCommentInPost(question, comment);
        event.target.value="";
        console.log('HomeComponent: Sending comment to server......');
        let payload={data:{question, comment}};
        this.commentService.addComment(payload).subscribe((data)=>{
          console.log("HomeComponent: Successfully add comment in database");
        }, (err)=>{
          console.log("HomeComponent: Unable to add comment in database");
          console.log(err);
        })
      }
    }
  }

  
  addCommentInPost(question, comment){
    console.log(this.questions);
    for (let idx in this.questions){
      let questionInfo=this.questions[idx];
      
      if(questionInfo.question==question){
        questionInfo.comments.push(comment);
      }
    }
  }

  ngOnInit() {

    console.log('HomeComponent: Getting data of subscribed questions......');
    this.questionService.getSubscribeQuestions().subscribe((data: any) => {
      console.log('HomeComponent: Received subscribed questions');
      console.log('HomeComponent: Displaying subscribed questions.....');
      for (let quesInfo in data.data) {
        let questionInfo = new Question(data.data[quesInfo]['email'], data.data[quesInfo]['question']);
        questionInfo.topics = data.data[quesInfo]['topics'][0].join(", ");
        questionInfo.comments = data.data[quesInfo]['comments'][0];
        this.questions.push(questionInfo);
      }
      console.log('HomeComponent: Subscribed questions displayed.');
    });
  }
  onLogOut() {
    console.log('HomeComponent: Application logout.......');
    this.auth.logout();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '500px',
      data: this.post
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('HomeComponent: Closing "Post" dialog.....');
      if (data) {
        console.log('HomeComponent: Getting values from dialog')
        let payload={data};
        console.log('HomeComponent: Sending post to the server');
        this.questionService.addQuestion(payload).subscribe((res)=>{
          console.log("HomeComponent: Successfully add post in database");
          this.questions.push(data);
        },(err)=>{
          console.log("HomeComponent: Unable to add post in database");
          console.log(err);
        });
      }
    });
  }
}

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent {

  public topics;
  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.topics = Globals.Topics;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
