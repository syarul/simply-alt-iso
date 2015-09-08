// create flux instance of alt on every request
var Alt = require('alt');

export
default class Flux extends Alt {

    constructor() {

        super();

        this.addActions('ActionCreators', require('./actions/ActionCreators'));

        this.addStore('RouteStore', require('./stores/RouteStore'));
        this.addStore('FirebaseStore', require('./stores/FirebaseStore'));
        this.addStore('CounterStore', require('./stores/CounterStore'));
    }
}