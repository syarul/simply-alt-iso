let express = require('express');
let path = require('path');
let app = express();
let React = require('react');
let Iso = require('iso');
let Flux = require('./js/flux');
let App = require('./js/components/App');

app.use('/dist', express.static(path.join(__dirname, 'dist')))

let htmlStart = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Alt + Isomorphic + Webpack</title>
                </head>
                <body>
                `;

let htmlEnd = `
                    <script type="text/javascript" src="dist/bundle.js" charset="utf-8"></script>
                </body>
                </html>
                `;

var routines = require('./js/routing.js');

routines.forEach((item) => {

    app.get(item.path, (req, res) => {

        var flux = new Flux();

        var RouteStore = flux.getStore('RouteStore');

        RouteStore[item.handler](req)
            .then(function success(result) {

                    let markup = React.renderToString(React.createElement(App, {
                        flux: flux
                    }));
                    let body = Iso.render(markup, flux.flush());
                    res.send(`${htmlStart}${body}${htmlEnd}`);

                },

                function fail(err) {
                    res.send('404 - Page Not Found');
                })

        .catch(function(foo) {
            console.log('\nserver catch: ', foo);
        })

    });

});

app.get('/test', function(req, res) {
    res.send('you on server route!');
});

// Handle 404
app.use((req, res) => {
    res.status(404).send('404: Page not Found');
});

// Handle 500
app.use((error, req, res, next) => {
    res.status(500).send('500: Internal Server Error');
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

 
var server = app.listen(app.get('port') ,app.get('ip'), function () {
  console.log("✔ Express server listening at %s:%d ", app.get('ip'),app.get('port'));
});

module.exports = server;