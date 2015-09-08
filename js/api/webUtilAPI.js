/**
 * Mocking client-server processing
 */
'use strict';

var Promise = require('es6-promise').Promise;

var Api = exports;
var TIMEOUT = 0;

var Firebase = require('firebase');
var myRootRef = new Firebase('https://scorching-inferno-2673.firebaseio.com/');

Api.getFirebaseData = function() {
    return new Promise((resolve) => {
        myRootRef.child('items/name').on('value', function(snapshot) {
            resolve(snapshot.val());
        });
    });
};

var _noninit = 567;


Api.loadInitCount = function(timeout) {
    timeout = timeout || TIMEOUT;
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve(_noninit);
        }, timeout);

    });
};