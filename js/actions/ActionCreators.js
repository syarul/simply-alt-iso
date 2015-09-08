'use strict';

var webUtilAPI = require('../api/webUtilAPI');

class ActionCreators {

    constructor() {

        this.generateActions(
            'actionClicked',
            'loadFirebaseData',
            'initCount'
        );
    }
    getFirebase() {

        var that = this;

        return webUtilAPI.getFirebaseData()

        .then(function success(arr) {
            that.alt.getActions('ActionCreators').loadFirebaseData(arr);
        });
    }
    initCounter() {

        var that = this;

        return webUtilAPI.loadInitCount()

        .then(function success(c) {
            that.alt.getActions('ActionCreators').initCount(c);
        });
    }
}

module.exports = ActionCreators;