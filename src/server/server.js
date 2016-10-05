var config = require('./config');

function Server(app) {
    this.app = app;
    this.httpServer = null;
    this.connections = {};
    this.connectionId = 0;
}

Server.prototype.start = function () {
    var fn = this,
        app = fn.app;

    fn.httpServer = app.listen(
        config.get("server:port"),
        config.get("server:host")
    );

    fn.httpServer.on('error', function (error) {
        if (error.errno === 'EADDRINUSE') {
            console.error(config.get("server:port") + ' is already in use');
        } else {
            console.error(error.errno);
        }
        process.exit(-1);
    });

    fn.httpServer.on('connection', function () {
        console.log('Connection on ' + config.get("url"));
    });

    fn.httpServer.on('listening', function () {
        console.log('Listening on ' + config.get("server:host") + ':' + config.get("server:port"));
        if (config.get("NODE_ENV") == 'production')
            console.log('Press Ctrl+C to quit.');
    });

};

module.exports = Server;