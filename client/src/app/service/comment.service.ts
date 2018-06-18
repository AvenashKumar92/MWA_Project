import { Injectable } from '@angular/core';
import { Comment } from '../model/Comment';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private commentApi //: AnswerApi
  ) { }

  getAnswers(questionId) {
    let query = {
      questionId: questionId
    }
    //return this.commentApi.find<Comment>({where: query}).toPromise()
  }

  getAnswer(anserId) {
    let query = {
      id: anserId
    }
    //return this.commentApi.find<Comment>({where: query}).toPromise()
  }

  createComment(values) {
    let data = new Comment();
    data.comment = values.answer;
    data.questionId = values.questionId;
    //return this.commentApi.create<Comment>(data).toPromise()
  }

  updateComment(values) {
    let data = new Comment();
    data.comment = values.comment;
    data.positiveVotes = values.positiveVotes;
    data.negativeVotes = values.negativeVotes;
    data.questionId = values.questionId;
    //return this.answerApi.updateAttributes<Comment>(values.id, data).toPromise()
  }

  countComment(questionId) {
    let query = {
      questionId: questionId
    }
    //return this.commentApi.count({where: query})
    //.toPromise()
  }
}
