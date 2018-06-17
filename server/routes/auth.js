var express = require('express');
var router = express.Router();

/*Return questions */
router.get('/questions', function (req, res, next) {
  res.send(req.user);
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