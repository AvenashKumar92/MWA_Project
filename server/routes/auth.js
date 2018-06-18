var express = require('express');
var router = express.Router();
const Information = require('../model/information');
const User = require('../model/user.model');
const Globals=require('../model/globals')

/*Return questions (Which asks by the same user)*/
router.get('/questions', function (req, res, next) {
  User.findQuestions(req.user.email, function (err, data) {

    let information = new Information(Globals.SUCCESS);
    if (err) {
      information.message = err.message;
      information.status=Globals.DB_SELECTION;
      res.status(400).json({ err, information });
    }
    if (!data || data.length <= 0) {
      information.message = "No question is found in the database";
      information.status=Globals.DB_SELECTION;
      res.status(400).json({ data, information });
      return;
    }
    res.json({ data, information });
  })
});

/*Add question */
router.get('/add/question', function (req, res, next) {
  res.send(req.user);
});

/*Remove question */
router.get('/remove/question', function (req, res, next) {
  res.send(req.user);
});

/*Return comments */
router.get('/comments', function (req, res, next) {
  res.send(req.user);
});

/*Add comment */
router.get('/add/comment', function (req, res, next) {
  res.send(req.user);
});

/*Remove comment */
router.get('/remove/comment', function (req, res, next) {
  res.send(req.user);
});

/*Return subscriptions */
router.get('/subscriptions', function (req, res, next) {
  res.send(req.user);
});

/*Add subscription */
router.get('/add/subscription', function (req, res, next) {
  res.send(req.user);
});

/*Remove subscription */
router.get('/remove/subscription', function (req, res, next) {
  res.send(req.user);
});

module.exports = router;