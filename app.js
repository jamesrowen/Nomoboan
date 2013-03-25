// Includes
//--------------------------------------------------------------------------
var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    BSON = require('mongodb').BSONPure;

    
// Express Configuration
//--------------------------------------------------------------------------
app.set('view engine', 'jade');
app.set('view options', { layout: false });
// this allows static files in the /public directory to be served automatically
app.use(express.static(__dirname+'/public'));
app.use(express.bodyParser());
app.listen(8080);


// Mongo Connection
//--------------------------------------------------------------------------
var mongoClient = new MongoClient(new Server("localhost", 27017));
var db;
var collection;
mongoClient.open(function(err, client) {
    if (err)
        console.log(err);
    else
    {
        console.log("mongo connected");
        db = mongoClient.db('dev');
        collection = db.collection('test');
    }
});


// Routes 
//--------------------------------------------------------------------------
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/partials/:name', function(req, res) {
    res.render('partials/' + req.params.name);
});

app.get('/api/contacts', function(req, res) {
    collection.find().toArray(function(err, docs) {
        res.json(docs);
    });
});

app.post('/api/addcontact', function(req, res) {
    //var sha = crypto.createHash('sha1');  
    //sha.update(JSON.stringify(post));
    //post.sha = sha.digest('hex');
    
    collection.insert(req.body, function(err, docs){
        res.json(err ? false : true);
        console.log(docs);
    });
}); 

app.post('/api/deletecontact/:id', function(req, res) {    
    collection.remove({ _id: BSON.ObjectID(req.params.id) }, function(err, docs) {
        res.json(err ? false : true);
    });
});   
