import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CommentService } from '../service/comment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  commentForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commentsService: CommentService,
    private thisDialogRef: MatDialogRef<CommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
  ) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      answer: new FormControl('', Validators.required)
    })
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

  onSubmit(values) {
    let data: any = {};
    data.answer = values.answer;
    data.questionId = this.modalData.questionId;
    /*this.commentsService.createComment(data)
      .then(answer => {
        this.thisDialogRef.close(answer);
        this.commentForm.reset();
      })*/
  }

}
