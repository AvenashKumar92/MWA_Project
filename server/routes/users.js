var express = require('express');
var router = express.Router();
const users = require('../controller/user.controller.js');

// Configuring the database
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/forum'

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(url)
  .then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
    console.log(err);
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
  });


/* Save User */
router.post('/', users.create);


module.exports = router;
