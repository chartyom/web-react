var db = require('../db'),
    load;

load = function () {
    return db.createConnection();
};

module.exports = {
    load: load,
    UsersModel: require('./UsersModel'),
    ClientsModel: require('./ClientsModel'),
    AccessTokenModel: require('./AccessTokenModel'),
    RefreshTokenModel: require('./RefreshTokenModel'),
    TasksModel: require('./TasksModel')
};