var sQuery = require('../utils/SimpleQuery');

module.exports = {
    findOne: function (where, cb) {
        sQuery(function (query) {
            return query.select().from('refreshToken').where(where).limit(1);
        }, cb).fetchOne();
    },
    create: function (data, cb) {
        sQuery(function (query) {
            return query('refreshToken').insert(data);
        }, cb).lastInsertId();
    },
    removeOne: function (where, cb) {
        sQuery(function (query) {
            return query('refreshToken').del().where(where).limit(1);
        }, cb).result();
    }
};

