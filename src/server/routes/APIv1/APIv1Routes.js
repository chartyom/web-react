//var UsersController = require('../../controllers').UsersController,
 var   Response = require('../../utils/ResponseJSON'),
    config = require('../../config'),
   // OAuth2 = require('../../handlers/oauth2'),
    moment = require('moment'),
    route;

/*
 GET — получение ресурса
 POST — создание ресурса
 PUT — обновление ресурса
 DELETE — удаление ресурса

 authenticate user
 http GET http://localhost:3000/v1/users/profile Authorization:'Bearer TOKEN'

 OTHER
 http GET http://localhost:3000/v1/users/
 */


module.exports = function (app, express) {

    // create application/json parser 
    var jsonParser = bodyParser.json();
    // create application/x-www-form-urlencoded parser 
    var urlencodedParser = bodyParser.urlencoded({ extended: false });

    route = express.Router();

    // middleware that is specific to this router
    route.use(function timeLog(req, res, next) {
        console.log('APIv1 Time: ' + moment().format("DD.MM.YYYY hh:mm:ss") + ' Url: ' + req.originalUrl);
        next();
    });

    route.get('/users', UsersController.find);
    route.get('/users/id:userId', UsersController.findById);
    route.put('/users/id:userId', UsersController.updateById);
    route.delete('/users/id:userId', UsersController.removeById);
    route.post('/users/registration', UsersController.create);


    route.get('/users/profile', OAuth2.authenticate, UsersController.profile);

    route.get('/config', function (req, res, next) {
        Response.success(res, config);
    });

    /*route.get('/api/userInfo', OAuth2.authenticate,
        function (req, res) {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            Response.success(res, {userId: req.user.userId, email: req.user.email, scope: req.authInfo.scope});
        }
    );*/
    /*
     app.get('/ErrorExample', function (req, res, next) {
     next(new Error('Random error!'));
     });
     */
}