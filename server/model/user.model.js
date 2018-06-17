const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
    {
        company: {
            city: String,
            cname: String,
            country: String,
            designation: String,
            State: String
        },


        contact: String,
        cpassword: String,
        email: String,
        fname: String,
        lname: String,
        password: String,
        Portfolio: String
    }


);

module.exports = mongoose.model('user', userSchema);