export class Globals{
    static LoginAPI="http://localhost:8080/user/login";
    static RegUserAPI="http://localhost:8080/user/register";
    static AddQuestionAPI="http://localhost:8080/auth/add/question";
    static AddCommentAPI="http://localhost:8080/auth/add/comment";
    static SubscribedQuestionsAPU="http://localhost:8080/auth/subscribed/questions";
    static Topics = [
        { value: 'Web-Development', viewValue: 'Web Development' },
        { value: 'Android-Development', viewValue: 'Android Development' },
        { value: 'IOS-Development', viewValue: 'IOS Development' },
        { value: 'C++', viewValue: 'C++' },
        { value: 'Java', viewValue: 'Java' },
        { value: 'Node', viewValue: 'Node' },
        { value: 'Mongo', viewValue: 'Mongo' },
        { value: 'Angular', viewValue: 'Angular' }
      ];
}