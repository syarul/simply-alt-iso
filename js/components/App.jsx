'use strict';

var React = require('react');
var About = require('./About.jsx');
var Home = require('./Home.jsx');

var App = React.createClass({

	childContextTypes: {
        flux: React.PropTypes.object.isRequired
    },
    getChildContext: function() {
        return {
            flux: this.props.flux || new Error('flux not found!')
        };
    },
    //call public methods from stores
    _getStateFromStores: function() {
        return {
            currentView: this.RouteStore.getCurrentView(),
            counter: this.CounterStore.getCounter(),
            firedata: this.FirebaseStore.getFireData()
        }
    },
    getInitialState: function() {
        this.flux = this.context.flux;
        this.ActionCreators = this.props.flux.getActions('ActionCreators');
        this.RouteStore = this.props.flux.getStore('RouteStore');
        this.CounterStore = this.props.flux.getStore('CounterStore');
        this.FirebaseStore = this.props.flux.getStore('FirebaseStore');
        return this._getStateFromStores();
    },

    componentDidMount: function() {
        this.RouteStore.listen(this._onChange);
        this.CounterStore.listen(this._onChange);
    },

    componentWillUnmount: function() {
        this.RouteStore.unlisten(this._onChange);
        this.CounterStore.unlisten(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getStateFromStores());
    },
    onCounterClicked: function(){
         this.ActionCreators.actionClicked();
    },
    render: function() {
        //console.log(this)
        var view;

        if (this.state.currentView == 'master') {
            view = <Home counter = {this.state.counter} onCounterClicked={this.onCounterClicked}/> ;
        } 
        if (this.state.currentView == 'about') {
            view = <About firedata = {this.state.firedata}/> ;
        }

        return (
      		<div>
                <div className="Menu">
                <ul>
                    <li>
                        <a href='/'>Home</a>
                    </li>
                    <li>
                        <a href='/about'>About</a>
                    </li>
                </ul>
                </div>
         		{view}
      		</div>
    );
  }
});

module.exports = App;