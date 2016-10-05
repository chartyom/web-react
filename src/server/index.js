// Server Loader
var express = require('express'),
    server = require('./server'),
    config = require('./config'),
    routes = require('./routes'),
    hbs        = require('hbs'),
    path = require('path'),
    //oauth = require('./handlers/authStrategy'),
    //models = require('./models'), 
    //passport = require('passport'),
    app;

app = express();

// Initialise
module.exports = {
    start: function () {

        /*Create DB connection*/
        // models.load().then(function () {
        //     console.log('Models: LOAD');
        // }).catch(function () {
        //     console.error('Models: ERROR LOAD');
        // });

        //Secure
        app.disable('x-powered-by');
        //Add view engine
        app.set('view engine', 'hbs');
        app.set('views', path.join(process.cwd(), 'views'));
        //Handlebars layouts
        //hbs.registerPartials('../../views');
        //Public files
        app.use(express.static(config.get("paths:content")));
        // init passport for auth
        //app.use(passport.initialize());
        // oauth strategy
        //oauth;
        // Routing
        routes(app, express);
        // Start Server
        (new server(app)).start();
    }
};
