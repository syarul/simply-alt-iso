'use strict';

var page = require('page');

class RouteStore {

    constructor() {

        this.ActionCreators = this.alt.getActions('ActionCreators');
        this.bindActions(this.ActionCreators);

        this.currentView = '----';

        this.exportPublicMethods({
            appHome: this.appHome.bind(this, this.ActionCreators),
            appAbout: this.appAbout.bind(this, this.ActionCreators),
            getCurrentView: this.getCurrentView.bind(this)
        });

        if ('undefined' !== typeof window) {

            var routines = require('../routing.js');

            routines.forEach((item) => {
                page(item.path, this[item.handler].bind(this, this.ActionCreators));
            });

            setTimeout(function() {
                page();
                //console.log('Client Router');
            }, 0);
        }

    }
    appHome(ac) {

        return ac.initCounter()
        .then(function() {
                this.setState({
                    currentView: 'master'
                });
            }
            .bind(this));
    }
    appAbout(ac) {

        return ac.getFirebase()
            .then(function() {
                this.setState({
                    currentView: 'about'
                });
            }.bind(this));
    }
    getCurrentView() {
        return this.currentView;
    }
}

module.exports = RouteStore;