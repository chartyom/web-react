var bodyParser = require('body-parser'),
    React = require('react'),
    ReactDOM = React.DOM;
import { renderToString } from 'react-dom/server'
import routes from '../../client/routes'
//import AppClient from '../../client/app'
import { match, RouterContext } from 'react-router'

//var ReactApp = React.createFactory(AppClient);

module.exports = function (app, express) {

    // create text/html parser 
    var textParser = bodyParser.text();

    let route = express.Router();

    route.get('*', function (req, res) {
        // Note that req.url here should be the full URL path from
        // the original request, including the query string.
        match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                console.error('ERROR 500: ' + error.message)
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                // You can also check renderProps.components or renderProps.routes for
                // your "not found" component or route respectively, and send a 404 as
                // below, if you're using a catch-all route.
                //res.status(200).send();
                res.render('main', {
                    title: 'Главная', 
                    description: 'Лидеры кинопроката', 
                    content: renderToString(<RouterContext {...renderProps} />)
                });
            } else {
                // В случае возникновения ошибки требуется уведомить администратора
                // Необходимо: выдать JSON ошибку, либо редирект на главную
                console.error('ERROR 404: ' + req.url)
                res.status(404).send('Not found')
            }
        })
    });

    // route.get('*', function (req, res) {

    //     // `props` represents the data to be passed in to the React component for
    //     // rendering - just as you would pass data, or expose variables in
    //     // templates such as Jade or Handlebars.  We just use some dummy data
    //     // here (with some potentially dangerous values for testing), but you could
    //     // imagine this would be objects typically fetched async from a DB,
    //     // filesystem or API, depending on the logged-in user, etc.
    //     var props = {
    //         items: [
    //             'Item 0',
    //             'Item 1',
    //             'Item </script>',
    //             'Item <!--inject!-->',
    //         ]
    //     }

    //     var html = ReactDOMServer.renderToStaticMarkup(
    //         ReactDOM.html(
    //             null,
    //             ReactDOM.head(
    //                 null,
    //                 ReactDOM.title({ dangerouslySetInnerHTML: {
    //                         __html: 'Name Page '
    //                     } }),
    //                 ReactDOM.link({ href: 'css/bootstrap/bootstrap.min.css' })
    //             ),
    //             ReactDOM.body(
    //                 null,
    //                 ReactDOM.div({
    //                     id: 'app', dangerouslySetInnerHTML: {
    //                         __html:
    //                         ReactDOMServer.renderToString(ReactApp())
    //                     }
    //                 }),

    //                 // The props should match on the client and server, so we stringify them
    //                 // on the page to be available for access by the code run in browser.js
    //                 // You could use any var name here as long as it's unique
    //                 ReactDOM.script({
    //                     dangerouslySetInnerHTML: {
    //                         __html:
    //                         'var APP_PROPS = ' + safeStringify(props) + ';'
    //                     }
    //                 }),
    //                 ReactDOM.script({ src: '/js/jquery.min.js' }),
    //                 ReactDOM.script({ src: '/js/bootstrap/bootstrap.min.js' }),
    //                 ReactDOM.script({ src: '/js/app.js' })
    //             )
    //         )
    //     );

    //     res.send(html);
    // });

    return route;
}

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}