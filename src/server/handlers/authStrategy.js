/*
 * Используется для описания «стратегии» passport.js
 */

var config                 = require('./../config/index'),
    passport               = require('passport'),
    BasicStrategy          = require('passport-http').BasicStrategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    BearerStrategy         = require('passport-http-bearer').Strategy,
    ClientsModel           = require('./../models/index').ClientsModel,
    UsersModel             = require('./../models/index').UsersModel,
    AccessTokenModel       = require('./../models/index').AccessTokenModel;


/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy(
    function (username, password, done) {
        ClientsModel.findOne({clientId: username},{column: ["clientId","clientSecret"]}, function (err, client) {

            console.log('new BasicStrategy');

            if (err) return done(err);
            if (!client) return done(null, false);
            if (client.clientSecret != password) return done(null, false);
            return done(null, client);
        });
    }
));
passport.use(new ClientPasswordStrategy(
    function (clientId, clientSecret, done) {
        ClientsModel.findOne({clientId: clientId},{column: ["clientId","clientSecret"]}, function (err, client) {

            console.log('new ClientPasswordStrategy');

            if (err) return done(err);
            if (!client) return done(null, false);
            if (client.clientSecret != clientSecret) return done(null, false);
            return done(null, client);
        });
    }
));
/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
    function (accessToken, done) {
        AccessTokenModel.findOne({token: accessToken}, function (err, token) {

            console.log('new BearerStrategy');

            if (err) return done(err, false);
            if (!token) return done(null, false, {message: 'Unknown token'});
            if (Math.round((Date.now() - token.created) / 1000) > config.options.tokenLife) {
                AccessTokenModel.removeOne({token: accessToken}, function (err) {
                    if (err) return done(err);
                });
                return done(null, false, {message: 'Token expired'});
            }

            UsersModel.findOne({userId: token.userId}, {column: ["userId", "email", "firstName", "secondName", "middleName"]}, function (err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, {message: 'Unknown user'});
                done(null, user, {scope: 'read'});
            });
        });
    }
));