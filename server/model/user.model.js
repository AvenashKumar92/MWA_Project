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
userSchema.statics.validateCredentials=function(emailID, pass, cb){
    return this.find({email:emailID, password:pass}, cb);
}
userSchema.statics.findByEmail=function(emailID, cb){
    return this.find({email:emailID}, cb);
}

userSchema.statics.findSubscriptions=function(emailID,cb){
    return this.find({email:emailID}).select('subscriptions').exec(cb);
}

//Done
userSchema.statics.findQuestions=function(emailID, cb){
    //return this.find({email:emailID}, cb);
    return this.find({email:emailID}).select('questions').exec(cb);
}

userSchema.statics.findSubscribedQuestions=function(emailID, cb){
    this.findSubscriptions(emailID, function(err, subscriptions){
        return this.find({email:{$ne:emailID}, 
            questions:{$elemMatch: {topics: {$in:subscriptions}}}}).select('questions').exec(cb);
    })
    
}

module.exports = mongoose.model('user', userSchema);
