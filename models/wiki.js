var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var wikiSchema = Schema({
  author: String,
  title: {type:String, required: true},
  content: String,
  category: {type:String, required: true},
  originalID: String,
  timestamp: Date
});

//"Wiki" will turn to "wikis" and  will become the collection in the MongoDB database
var Wiki = mongoose.model("Wiki", wikiSchema);

//this is exporting the Wiki to the controller
module.exports = Wiki;
