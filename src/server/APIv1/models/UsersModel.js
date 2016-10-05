var sQuery       = require('../utils/SimpleQuery'),
    ModelHelpers = require('../utils/ModelHelpers');

module.exports = {
    /**
     * @param {Object} where
     * @param {Object} options => {limit,offset,page,column}
     * @param {Function} cb
     */
    find: function (where, options, cb) {
        //Настройка options
        options = ModelHelpers.options(options, cb);
        sQuery(function (query) {
            return query.column(options.column).select().from('users').where(where).limit(options.limit).offset(options.offset);
        }, options.callback).fetch();
    },
    findOne: function (where, options, cb) {
        //Настройка options
        options = ModelHelpers.options(options, cb);
        sQuery(function (query) {
            return query.column(options.column).select().from('users').where(where).limit(1);
        }, options.callback).fetchOne();
    },
    remove: function (where, cb) {
        sQuery(function (query) {
            return query('users').del().where(where);
        }, cb).result();
    },
    removeOne: function (where, cb) {
        sQuery(function (query) {
            return query('users').del().where(where).limit(1);
        }, cb).result();
    },
    create: function (data, cb) {
        sQuery(function (query) {
            return query('users').insert(data);
        }, cb).lastInsertId();
    },
    update: function (update, where, cb) {
        sQuery(function (query) {
            return query('users').where(where).update(update);
        }, cb).result();
    },
    updateOne: function (update, where, cb) {
        sQuery(function (query) {
            return query('users').update(update).where(where).limit(1);
        }, cb).result();
    }
};