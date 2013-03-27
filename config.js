// app config
exports.port = 8080;

// mongolab.com connection details
exports.dbuser = '[blank]';
exports.dbpass = '[blank]';
exports.dburl = '[blank]';
exports.dbname = '[blank]';
exports.connectionstring = 'mongodb://' + exports.dbuser + ':' + 
  exports.dbpass + '@' + exports.dburl + '/' + exports.dbname;
  