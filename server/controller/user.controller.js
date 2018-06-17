const User = require('../model/user.model.js');

// Create and Save a new User
module.exports.create = (req, res) => {
    // Create a User
    const user = new User({
        company: {
            city: req.body.company.city,
            cname: req.body.company.cname,
            country: req.body.company.country,
            designation: req.body.company.designation,
            State: req.body.company.state
        },

        contact: req.body.contact,
        cpassword: req.body.cpassword,
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        password: req.body.password,
        Portfolio: req.body.portfolio
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while registering the User."
            });
        });
};