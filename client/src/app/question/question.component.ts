import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentService } from '../service/comment.service'
import { Question } from '../model/Question';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommentsComponent } from '../comments/comments.component';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: Question;

  constructor(
    private commentsService: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.question = data.question;
      }
    })
  }

  openNewCommmentModal(questionId) {
    let dialogRef = this.dialog.open(CommentsComponent, {
      data: { questionId: questionId }
    });

    dialogRef.afterClosed().subscribe(comment => {
      if (comment) {
        this.addCommentToList(comment);
      }
    })
  }

  openUpdateCommentModal(answer) {
    let dialogRef = this.dialog.open(CommentsComponent, {
      data: { answer: answer }
    });

  }

  delete(answerId) {
    let dialogRef = this.dialog.open(CommentsComponent, {
      data: { answerId: answerId }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        var index = this.question.comments.findIndex((answer) => answer.id === answerId);
        this.question.comments.splice(index, 1);
      }
    })

  }

  addPositiveVote(comment) {
    comment.positiveVotes += 1;
    this.commentsService.updateComment(comment);
  }

  addNegativeVote(comment) {
    comment.negativeVotes += 1;
    this.commentsService.updateComment(comment);
  }

  addCommentToList(comment) {
    this.question.comments.push(comment);
  }

}
