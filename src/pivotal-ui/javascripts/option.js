'use strict';
var React = require('react/addons');

var Option = React.createClass({
  render: function() {
    return (
      <option {...this.props}>
        {this.props.children}
      </option>
    );
  }
});

module.exports = {Option};
