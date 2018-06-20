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

  constructor(private questionService: QuestionService, public dialog: MatDialog,
    private auth: AuthService) {

  }

  onKeyDown(event){
    if(event.key==="Enter"){
      let comment=event.target.value;
      let question=event.target.name;
      this.addCommentInPost(question, comment);
      event.target.value="";
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
      console.log('HomeComponent: Received subscribed question');
      for (let quesInfo in data.data) {
        let questionInfo = new Question(data.data[quesInfo]['email'], data.data[quesInfo]['question']);
        questionInfo.topics = data.data[quesInfo]['topics'][0].join(", ");
        questionInfo.comments = data.data[quesInfo]['comments'][0];
        this.questions.push(questionInfo);
      }
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
        console.log('HomeComponent: Values retured from dialog')
        console.log(data);
        let payload={data};
        console.log('HomeComponent: Sending question payload to the server');
        this.questionService.addQuestion(payload).subscribe((res)=>{
          console.log(res);
          this.questions.push(data);
        },(err)=>{
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
