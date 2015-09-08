'use strict';

require('es5-shim');
require('es5-shim/es5-sham');

var React = require('react');
var App = require('./components/App');

var Iso = require('iso');
var Flux = require('./flux');
var flux = new Flux();

Iso.bootstrap(function (state, meta, container) {
    flux.bootstrap(state);
    React.render( React.createElement(App, {flux: flux}), container);
});
