'use strict';

var React = require('react');

var Home = React.createClass({
    propTypes: {
        counter: React.PropTypes.number.isRequired,
        onCounterClicked: React.PropTypes.func.isRequired
    },
    render: function() {
        var counter = this.props.counter;
        return (
            <div className="Home">
              <button onClick={this.props.onCounterClicked}>Count Add</button><br />
              Counter : {counter}
            </div>
            );
    }
});

module.exports = Home;