'use strict';

class FirebaseStore {

    constructor() {

        this.ActionCreators = this.alt.getActions('ActionCreators');

        this.bindActions(this.ActionCreators);

        this.firedata = '';

        this.exportPublicMethods({
            getFireData: this.getFireData.bind(this)
        });
    }
    onLoadFirebaseData(arr) {
        //console.log( '\nonLoadFirebaseData = ' , arr);
        this.firedata = arr;
    }
    getFireData() {
        return this.firedata;
    }
}

module.exports = FirebaseStore;