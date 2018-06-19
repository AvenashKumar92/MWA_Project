const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        company: {
            city: String,
            cname: String,
            country: String,
            designation: String,
            state: String
        },

        subscriptions:[String],
        questions:[{
            question:String,
            topics:[String],
            comment:[String]
        }],

        contact: String,
        password: String,
        email: {type:String, unique:true},
        fname: String,
        lname: String,
        portfolio: String
    }


);

//Done
userSchema.statics.validateCredentials=function(emailID, pass, cb){
    return this.find({email:emailID, password:pass}, cb);
}

//Done
userSchema.statics.findByEmail=function(emailID, cb){
    return this.find({email:emailID}, cb);
}

//Done
userSchema.statics.findSubscriptions=function(emailID,cb){
    return this.findOne({email:emailID}).select('subscriptions').exec(cb);
}

//Done
userSchema.statics.findQuestions=function(emailID, cb){
    return this.find({email:emailID}).select('questions').exec(cb);
}

//Done
userSchema.statics.findSubscribedQuestions=function(emailID, subscriptions, cb){
    //{ $match: {mcount: {$gt: 0}}},
    return this.aggregate([{"$unwind": "$questions"}, 
    {"$match":{"questions.topics":{"$elemMatch":{"$in":subscriptions}}}},
    {$group:{"_id":{"email":"$email", "question":"$questions.question"}, 
    "comments":{"$addToSet":"$questions.comment"},
        "topics":{"$addToSet":"$questions.topics"}}}, 
    {$project:{"_id":0,"email":"$_id.email", "question":"$_id.question", 
    "comments":"$comments",
    "topics":"$topics"}}], cb);
}

userSchema.statics.addQuestion=function(emailID, question, cb){
        return this.findOneAndUpdate({email: emailID}, {$push: {questions: question}}).exec(cb);
}

module.exports = mongoose.model('user', userSchema);
