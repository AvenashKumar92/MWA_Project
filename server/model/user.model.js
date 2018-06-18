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

userSchema.statics.findSubscribedQuestions=function(emailID, subscriptions, cb){
    return this.find({email:{$ne:emailID}, 
        questions:{$elemMatch: {topics: {$in:subscriptions}}}}).select('questions').exec(cb);

}

/*userSchema.statics.findSubscribedQuestions=function(emailID, subscriptions,  cb){
    this.findSubscriptions(emailID, function(err, subscriptions){
        console.log(subscriptions.subscriptions);
        return userSchema.statics.findSubQuestions(emailID, subscriptions, cb);
    })
    
}*/

module.exports = mongoose.model('user', userSchema);
