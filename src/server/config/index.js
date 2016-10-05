var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({ file: path.join(process.cwd(), 'config/' + (process.env.NODE_ENV || 'development') + '.json') });

module.exports = nconf;