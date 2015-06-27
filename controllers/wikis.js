var express = require('express'),
    router  = express.Router(),
    Wiki    = require('../models/wiki.js');

//seven restful ROUTES

//INDEX
router.get('/', function(req, res){
  Wiki.find({}, function(err, wikisArray){
    if (err){
      console.log(err);
    }else{
      console.log("wikisArray: " + wikisArray);
      res.render('wikis/index', {wiki: wikisArray});
    };
  });
});

//NEW
router.get('/new', function(req, res){
  res.render('wikis/new');
});

//CREATE
router.post('/', function (req, res){
  var newWiki = new Wiki(req.body.wiki);

  newWiki.author = req.session.currentUser;

  //use the data that we collected and save it to database
  newWiki.save(function(err, wiki){
    if (err) {
      console.log(err);
    }else{
      console.log("wiki: " + wiki);
      res.redirect(301, '/wikis');
    }
  })
});

//SHOW (individual forms)
router.get("/:id", function(req, res){
  var mongoID = req.params.id;

  Wiki.findOne({_id:mongoID}, function(err, foundWiki){
    if (err) {
      console.log(err);
    }else{
      res.render('wikis/show', {
        wiki: foundWiki,
        currentUser: req.session.currentUser
        });
    };
  });

});

//DELETE
router.delete('/:id', function(req, res){
  var mongoID = req.params.id;

  Wiki.remove({_id:mongoID}, function (err, foundWiki){
    res.redirect(301, "/wikis");
  });
});


//EDIT
router.get("/:id/edit", function(req, res){
  var mongoID = req.params.id;

  Wiki.findOne({_id:mongoID}, function(err, foundWiki){
    if (err) {
      console.log(err);
    }else{
      res.render('wikis/edit', {wiki: foundWiki});
    }
  });
});

//UPDATE
router.patch('/:id', function(req, res){
  var mongoID = req.params.id;
  var newInfo = req.body.wiki;

  Wiki.update({_id:mongoID}, newInfo, function(err, newInfo){
    if (err) {
      console.log(err);
    }else{
      res.redirect(301, "/wikis/" + mongoID);
    };
  });
});


module.exports = router;
