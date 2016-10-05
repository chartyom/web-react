var Routes = require('./Routes');
//    APIv1Routes = require('./APIv1/APIv1Routes');

module.exports = function (app, express) {

    app.use('/', Routes(app, express));
    //app.use('/v1', APIv1Routes(app, express));

};