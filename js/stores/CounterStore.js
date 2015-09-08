'use strict';

class CounterStore {

    constructor() {

        this.ActionCreators = this.alt.getActions('ActionCreators');

        this.bindActions(this.ActionCreators);

        this.counter = null;

        this.exportPublicMethods({
            getCounter: this.getCounter.bind(this)
        });
    }
    onInitCount(d) {
        //console.log( '\nonLoadInitCount = ' , d);
        this.counter = d;
    }
    onActionClicked() {
        this.counter++;
        this.emitChange();
    }
    getCounter() {
        return this.counter;
    }
}

module.exports = CounterStore;