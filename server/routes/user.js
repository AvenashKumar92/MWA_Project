const express = require('express');
const router = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const Information=require('../model/information');

const User = require('../model/user.model');


/* POST login. */
router.post('/login', function (req, res, next) {

  passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
          //No need to display database internal eror
          err="";
          
          //Display meaning full error
          let error = new Information ("Login failed", 4000);

          return res.status(400).json(error);
      }

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }

          const token = jwt.sign(user, 'my_jwt_secret');

          let metadata = new Information ("Ok", 200);
          return res.json({token, metadata});
      });
  })
  (req, res);

});

router.post('/register', function (req, res) {
  
  // Create a User
  const user = new User({
    company: {
      city: req.body.company.city,
      cname: req.body.company.cname,
      country: req.body.company.country,
      designation: req.body.company.designation,
      state: req.body.company.state
    },

    contact: req.body.contact,
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    password: req.body.password,
    portfolio: req.body.portfolio
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
})


module.exports = router;
