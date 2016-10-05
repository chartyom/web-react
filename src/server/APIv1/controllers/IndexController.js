var UsersModel = require('../models').UsersModel,
    Response   = require('../utils/ResponseJSON');

module.exports = {
    // method: GET
    // url: users
    // params:
    // query:
    main: function (req, res, next) {
        Response.success(res, {
            App: 'RESTful API',
            date: new Date(),
            description: 'BackEnd by Artyom',
            versions: [
                "v1"
            ]
        });
    }
};

