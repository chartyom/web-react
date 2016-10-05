var knex    = require('knex'),
    _       = require('lodash'),
    config  = require('../config'),
    Promise = require('bluebird');

/*Create knex connection object*/

function Connection() {
    this._query = null;
}

Connection.prototype.createConnection = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        if (!self._query && config.database && config.database.client) {
            self.set(config.database);
            resolve();
        } else {
            reject();
        }
    });
};

Connection.prototype.set = function (config) {
    this._query = knex(config);
    _.extend(this,this._query);
};

Connection.prototype.get = function () {
    return this._query;
};


module.exports = new Connection();




