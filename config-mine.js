// app config
exports.port = 1234;

// mongolab.com connection details
exports.dbuser = 'dbuser';
exports.dbpass = 'dbpass';
exports.dburl = 'ds043037.mongolab.com:43037';
exports.dbname = 'nomoboan';
exports.connectionstring = 'mongodb://' + exports.dbuser + ':' + 
  exports.dbpass + '@' + exports.dburl + '/' + exports.dbname;
  