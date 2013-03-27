// examples of mongo api calls from within node

var apikey = '[replace with an actual key]';

// get all docs in the contacts collection
var options = {
  host: 'api.mongolab.com',
  port: 443,
  path: '/api/1/databases/nomoboan/collections/contacts?apiKey=' + apikey,
  method: 'GET'
};

var req1 = https.request(options, function(res1) {
  res1.on('data', function(d) {
    res.send(d);
  });
});
req1.end();
  
  
// add a doc to the contacts collection
var options = {
  host: 'api.mongolab.com',
  port: 443,
  path: '/api/1/databases/nomoboan/collections/contacts?apiKey=' + apikey,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': JSON.stringify(req.body).length
  }
};

var req1 = https.request(options, function(res1) {
  res1.on('data', function(d) {
    res.send(d);
  });
});
req1.write(JSON.stringify(req.body));
req1.end();


// update a contact
var options = {
  host: 'api.mongolab.com',
  port: 443,
  path: '/api/1/databases/nomoboan/collections/contacts?apiKey=' + apikey + '&q={"_id":{"$oid":"' + req.params.id + '"}}',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': JSON.stringify(req.body).length
  }
};
console.log(options.path);
var req1 = https.request(options, function(res1) {
  res1.on('data', function(d) {
    console.log('data: ' + d);
    res.send(d);
  });
});
req1.write(JSON.stringify(req.body));
req1.end();