var React = require('react');

var About = React.createClass({
    propTypes: {
		firedata: React.PropTypes.string.isRequired
	},
    render: function() {
    	var firedata = this.props.firedata;
        return (
            <h1 className="header">
               This is About: {firedata}
            </h1>
        );
    }
});

module.exports = About;