import { ClassDirective } from "@angular/flex-layout";

export interface Post {
    question: string;
    topics: string[];
    comments: string[];
}

export class PostMaker {
    static create(event: Post) {
        return { question: event.question, topics: event.topics, comments: event.comments };
    }
}