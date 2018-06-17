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


module.exports = mongoose.model('user', userSchema);
