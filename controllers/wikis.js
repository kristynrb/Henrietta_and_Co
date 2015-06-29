var express = require('express'),
    router  = express.Router(),
    Wiki    = require('../models/wiki.js'),
    User    = require('../models/user.js');

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
  newWiki.timestamp = Date.now();
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
  var originalID = mongoID;

  Wiki.findOne({_id:mongoID}, function(err, foundWiki){
    if (err) {
      console.log(err);
    }else{
      res.render('wikis/edit', {wiki: foundWiki});
    }
  });
});

//ADD AN UPDATED POST
router.post("/:id", function(req, res){
  var updatedWiki = new Wiki(req.body.wiki);
  var newWiki = new Wiki(req.body.wiki);

  updatedWiki.timestamp = Date.now();
  updatedWiki.author = req.session.currentUser;
  // updatedWiki.originalID = mongoID;

    updatedWiki.save(function(err, wiki){
      if (err) {
        console.log(err);
      }else{
        res.render('wikis/index', {wiki: wikisArray});
        console.log("wiki: " + wiki);
        // res.redirect(301, '/wikis/originalID');
      }
    });
});



//UPDATE
// router.patch('/:id', function(req, res){
//   var mongoID = req.params.id;
//   var newInfo = req.body.wiki;
//   // create where orginal_id = mongoID
//   // sort by timestamp
//
//   Wiki.update({_id:mongoID}, newInfo, function(err, newInfo){
//     if (err) {
//       console.log(err);
//     }else{
//       res.redirect(301, "/wikis/" + mongoID);
//     };
//   });
// });


module.exports = router;
