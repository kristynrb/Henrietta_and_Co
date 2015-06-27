var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

//NEW
router.get('/new', function(req, res){
  res.render('users/new');
});

//CREATE
router.post('/', function(req, res){
  var newUser = new User(req.body.user);
  console.log(newUser);

  newUser.save(function(err, user){
    res.redirect(301, "../wikis")
  });
});

//LOGIN
router.get('/login', function(req, res){
  res.render("users/login");
});

//set current user on session
router.post('/login', function(req, res){
  var loginAttempt = req.body.user;

  User.findOne({username: loginAttempt.username}, function (err, user){
    if (user && user.password === loginAttempt.password){ //if they find a user and the password is equal
      req.session.currentUser = user.username; //then create a user session
      res.redirect(301, "../wikis"); //if it matches, go to the wiki page
    }else{
      res.redirect(301, "/users/login"); //if it doesn't match, go to login page again
    };
  });
});

module.exports = router;
