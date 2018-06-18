import { Question } from './Question';



declare var Object: any;
export interface CommentInterface {
    "comment": string;
    "negativeVotes"?: number;
    "positiveVotes"?: number;
    "id"?: any;
    "questionId"?: any;
    question?: Question;
}

export class Comment implements CommentInterface {
    "comment": string;
    "negativeVotes": number;
    "positiveVotes": number;
    "id": any;
    "questionId": any;
    question: Question;
    constructor(data?: CommentInterface) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Comment`.
     */
    public static getModelName() {
        return "Comment";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Comment for dynamic purposes.
    **/
    public static factory(data: CommentInterface): Comment {
        return new Comment(data);
    }

    public static getModelDefinition() {
        return {
            name: 'Answer',
            plural: 'Answers',
            path: 'Answers',
            idName: 'id',
            properties: {
                "comment": {
                    name: 'answer',
                    type: 'string'
                },
                "negativeVotes": {
                    name: 'negativeVotes',
                    type: 'number',
                    default: 0
                },
                "positiveVotes": {
                    name: 'positiveVotes',
                    type: 'number',
                    default: 0
                },
                "id": {
                    name: 'id',
                    type: 'any'
                },
                "questionId": {
                    name: 'questionId',
                    type: 'any'
                },
            },
            relations: {
                question: {
                    name: 'question',
                    type: 'Question',
                    model: 'Question',
                    relationType: 'belongsTo',
                    keyFrom: 'questionId',
                    keyTo: 'id'
                },
            }
        }
    }
}