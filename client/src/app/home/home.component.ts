import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Post, PostMaker } from '../model/Post';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { QuestionService } from '../service/question.service';
import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router';
import {
  MatTableDataSource
} from '@angular/material';


class QuesInfo{
  public topics;
  public comments[];
  constructor(public email, public question){

  }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  panelOpenState: boolean = false;
  private questionData:QuesInfo[]=[];
  constructor(private questionService: QuestionService, public dialog: MatDialog,
    private auth: AuthService,
    private router: Router) {
    
  }

  ngOnInit(){
    this.questionService.getsubscribeQuestions().subscribe((data:any)=>{
      //console.log(data);
      for( let quesInfo in  data.data){
        let questionInfo=new QuesInfo(data.data[quesInfo]['email'], data.data[quesInfo]['question']);
        questionInfo.topics=data.data[quesInfo]['topics'][0].join(", ");
       
        questionInfo.comments=data.data[quesInfo]['comments'][0];
        console.log(questionInfo.comments);

        this.questionData.push(questionInfo);
      }
    });
  }
  onLogOut() {
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

export class PostDataSource /*extends DataSource<any>*/ {

  panelOpenState: boolean = false;
  constructor(private questionService: QuestionService) {
    //super();
  }

  ngOnInit() {

  }
}
  /*connect(): Observable<String[]> {
    let posts: String[];
    posts = ['What are c++ templates?', 'What is event loop?'];
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

            /*posts.push(data.questions[uquestion].questions[question].question)
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
*/