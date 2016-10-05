//SimpleQuery:
//Return array SimpleQuery(query, done).fetch();
//Return single element SimpleQuery(query, done).fetchOne();
var db = require('../db');

module.exports = function (query, done) {

    function _constructor(cb) {
        db.transaction(query).then(function result(data) {
            if(cb) cb(data);
        }).catch(function (err) {
            done(err);
        });
    }

    return {
        fetch: function () {
            _constructor(function (data) {
                done(null, data);
            });
        },
        fetchOne: function () {
            _constructor(function (data) {
                done(null, data[0]);
            });
        },
        lastInsertId: function () {
            _constructor(function (data) {
                done(null, {lastInsertId: data[0]});
            });
        },
        //Result success: 1 OR undefined
        result: function () {
            _constructor(function (data) {
                if (data)
                    return done(null, {success: 1});
                return done(null, data);
            });
        }
    }
};