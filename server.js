// MVC - Models, views, controllers:
// The model sets the properties for the object (using mongoose, where you put the schema),
// Views is the location for the files that are served up to the client - what they view,
// Controllers are the files that setup the route/paths where you call the view paths for the models.

//server.js is initializing everything / setting up the database and server
var bodyParser          = require('body-parser'),
    express             = require('express'),
    marked              = require('marked'),
    mongoose            = require('mongoose'),
    ejs                 = require('ejs'),
    methodOverride      = require('method-override'),
    expressLayouts      = require('express-ejs-layouts'),
    server              = express(),
    session             = require('express-session'),
    PORT                = process.env.PORT || 3000,
    //this sets it to the process port if it's defined (otherwise to 3000)
    MONGOURI            = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/deploy_me'



console.log(marked('I am using __markdown__.'));

//SET
server.set('views', './views');
server.set('view engine', 'ejs');

//USE

server.use(session({
  secret: "wdiArcherProjectTwo",
  resave: true,
  saveUninitialized: false
}));

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(express.static('./public'));
server.use(methodOverride('_method'));
server.use(morgan('short'));
server.use(expressLayouts);


//ROUTES & CONTROLLERS
//Homepage
var wikiController = require('./controllers/wikis.js');
server.use('/wikis', wikiController);

var userController = require('./controllers/users.js');
server.use('/users', userController);

server.get('/', function(req, res){
  res.render('welcome.ejs');    //the .render command will always look in your views folder
});

//CATCHALL ROUTES
server.use(function(req, res){
  res.send("This is not the web page you are looking for");
});

//DATABASE & SERVER
mongoose.connect(MONGOURI);
var db = mongoose.connection;

db.on('error', function(){
  console.log("Database errors!");
});

db.once('open', function(){
  console.log("Database UP AND RUNNING!");
  server.listen(PORT, function (){
    console.log("Server 3000 up and running!");
  });
});
