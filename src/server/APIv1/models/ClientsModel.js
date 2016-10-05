var sQuery       = require('../utils/SimpleQuery'),
    ModelHelpers = require('../utils/ModelHelpers');

module.exports = {
    findOne: function (where, options, cb) {
        options = ModelHelpers.options(options, cb);
        sQuery(function (query) {
            return query.column(options.column).select().from('clients').where(where).limit(1);
        }, options.callback).fetchOne();
    },
    removeOne: function (where, cb) {
        sQuery(function (query) {
            return query('clients').del().where(where).limit(1);
        }, cb).result();
    }
};

