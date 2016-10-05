var Response        = require('../../utils/ResponseJSON');

/*
 GET — получение ресурса
 POST — создание ресурса
 PUT — обновление ресурса
 DELETE — удаление ресурса
 */

module.exports = function(app){

    app.use(function (req, res, next) {
        Response.error(res, 404, null, function () {
            console.error('Not found URL: ' + req.url);
        });
    });

    app.use(function (err, req, res, next) {
        Response.error(res, err.status || 500, err.message, function () {
            console.error('Internal error(' + res.statusCode + '): ' + err.message + ' (' + req.url + ')');
        });
    });
};


