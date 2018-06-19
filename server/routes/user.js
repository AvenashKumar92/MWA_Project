const express = require('express');
const router = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
const Information=require('../model/information');
const Globals=require('../model/globals');

const User = require('../model/user.model');


/* POST login. */
router.post('/login', function (req, res, next) {

  passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
          //No need to display database internal eror
          err="";
          
          //Display meaning full error
          let information = new Information (Globals.AUTH_ERROR, "Login failed");

          return res.status(401).json({information});
      }

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }
          const token = jwt.sign(user, Globals.JWTSECRET);
          let information = new Information (Globals.SUCCESS);
          return res.json({token, information});
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

    subscriptions:req.body.subscriptions,
    questions:req.body.questions,
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
      let information=new Information(Globals.SUCCESS, 'User added successfully');
      res.json({information});
    }).catch(err => {

      if(err.code===11000){
        let information=new Information(Globals.DB_INSERTION, 'Email is already registered on server');
        res.status(400).json({err, information});
      }
      else{
        let information=new Information(Globals.DB_INSERTION, err.message);
        res.status(400).json({err, information});
      }
    });
})


module.exports = router;
