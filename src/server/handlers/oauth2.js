var oauth2orize       = require('oauth2orize'),
    passport          = require('passport'),
    crypto            = require('crypto'),
    config            = require('./../config/index'),
    UsersModel        = require('./../models/index').UsersModel,
    AccessTokenModel  = require('./../models/index').AccessTokenModel,
    RefreshTokenModel = require('./../models/index').RefreshTokenModel,
    Response          = require('./../utils/ResponseJSON'),
    AuthHelpers       = require('./../utils/AuthHelpers');

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, email, password, scope, done) {

    console.log('oauth2orize.exchange.password');

    UsersModel.findOne({email: email}, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!AuthHelpers.checkPassword(password, user.passwordSalt, user.password)) return done(null, false);

        RefreshTokenModel.removeOne({userId: user.userId, clientId: client.clientId}, function (err) {
            if (err) return done(err);
        });
        AccessTokenModel.removeOne({userId: user.userId, clientId: client.clientId}, function (err) {
            if (err) return done(err);
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');

        RefreshTokenModel.create({
            token: refreshTokenValue,
            clientId: client.clientId,
            userId: user.userId
        }, function (err) {
            if (err) return done(err);
        });

        AccessTokenModel.create({
            token: tokenValue,
            clientId: client.clientId,
            userId: user.userId
        }, function (err, token) {
            if (err) return done(err);
            done(null, tokenValue, refreshTokenValue, {'expires_in': config.get().options.tokenLife});
        });
    });
}));


// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {

    console.log('oauth2orize.exchange.refreshToken');

    RefreshTokenModel.findOne({token: refreshToken}, function (err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false, {message: "Unknown Token"});
        }

        UsersModel.findOne({userId: token.userId}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: "Unknown User"});
            }

            RefreshTokenModel.removeOne({userId: user.userId, clientId: client.clientId}, function (err) {
                if (err) return done(err);
            });
            AccessTokenModel.removeOne({userId: user.userId, clientId: client.clientId}, function (err) {
                if (err) return done(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');

            RefreshTokenModel.create({
                token: refreshTokenValue,
                clientId: client.clientId,
                userId: user.userId
            }, function (err) {
                if (err) return done(err);
            });

            var info = {scope: '*'};

            AccessTokenModel.create({
                token: tokenValue,
                clientId: client.clientId,
                userId: user.userId
            }, function (err, token) {
                if (err) return done(err);
                done(null, tokenValue, refreshTokenValue, {'expires_in': config.get().options.tokenLife});
            });
        });
    });
}));


// token endpoint
/*exports.authorization = [
 function (req, res, next) {
 passport.authenticate(['basic', 'oauth2-client-password'], {session: false}, function (err, client, info) {
 console.log('Output: ' + err + ' ' + client.clientId + ' ' + info);
 if (err) {
 return next(err);
 }
 if (!client) {
 return Response.error(res,403,info);
 }

 })(req, res, next);
 },
 server.token(),
 server.errorHandler()
 ];*/

// token endpoint
exports.authorization = [
    function (req, res, next) {
        passport.authenticate(['basic', 'oauth2-client-password'], {session: false}, function (err, data, info, status) {
            if(err)
                return Response.error(res, 500, {data: data, info: info, status: status});
            if(!data)
                return Response.error(res, 401, {info: info, status: status});

            req.logIn(data, {session: false}, function(err) {
                if (err) { return next(err); }
                next();
            });
        })(req, res, next);
    },
    server.token(),
    function (err, req, res, next) {
        if (err.status) {
            res.statusCode = err.status;
        }
        if (!res.statusCode || res.statusCode < 400) {
            res.statusCode = 500;
        }
        var e = {};
        e.error = err.code || 'server_error';
        if (err.message) {
            e.error_description = err.message;
        }
        if (err.uri) {
            e.error_uri = err.uri;
        }
        Response.error(res, res.statusCode, e);
    }
];

/*,
 server.errorHandler()*/

// check token and set output errors
exports.authenticate = [
    function (req, res, next) {
        passport.authenticate('bearer', {session: false}, function (err, data, info, status) {
            if(err)
                return Response.error(res, 500, {data: data, info: info, status: status});
            if(!data)
                return Response.error(res, 401, {info: info, status: status});
            req.logIn(data, {session: false}, function(err) {
                if (err) { return next(err); }
                next();
            });
        })(req, res, next);
    }
];
