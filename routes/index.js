var express = require('express');
var session = require('express-session');
var router = express.Router();
const config = require('../config');
var User = require('../user');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user == undefined) req.session.user = '';
  res.render('index', { "message": "", 'user': req.session.user });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  if (req.session.user == undefined) req.session.user = '';
  res.render('index', { "message": "", 'user': req.session.user });
});

/* GET signin page. */
router.get('/signin', function (req, res, next) {
  res.render('signin', { "message": "", 'user': req.session.user });
});

/* GET content page. */
router.get('/content', function (req, res, next) {
  if (req.session.user == '')
    res.render('index', { "message": "Please login first", 'user': req.session.user });
  else
    res.render('content', { "message": "", 'user': req.session.user });
});

/* GET signout page. */
router.get('/signout', function (req, res, next) {
  req.session.user = '';
  res.render('index', { "message": "You have been logged out", 'user': req.session.user });
});

/* POST signin page. */
router.post('/signin', function (req, res, next) {
  console.log("signin as: " + req.body.username);
  User.find(req.body.username, function (err, users) {
    if (err)
      res.render('error', err);
    if (users.length > 0) {
      var user = users[0].fullname;
      req.session.user = user;
      res.render('content', { "message": user + ": Welcome back !", 'user': req.session.user })
    } else
      res.render('signin', { "message": "Username/password incorrect", 'user': req.session.user })
  })
});

/* GET signin page. */
router.get('/register', function (req, res, next) {
  res.render('register', { "message": "", 'user': req.session.user });
});

/* POST register page. */
router.post('/register', function (req, res, next) {
  console.log("register: " + req.body.fullname);
  User.find(req.body.username, function (err, users) {
    if (err)
      res.render('error', err);
    if (users.length > 0) {
      var user = users[0].fullname;
      res.render('register', { "message": "Username is not available", 'user': req.session.user })
    } else {
      User.insert(req, function (err) {
        if (err)
          res.render('error', err);
        res.render('content', { "message": "New user registered: " + req.body.fullname, 'user': req.session.user })
      })
    }
  })
});

module.exports = router;