'use strict';
var React = require('react/addons');

var FilterableSelect = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      dropdownExpanded: false
    }
  },

  dropdownToggle: function() {
    this.setState({dropdownExpanded: !this.state.dropdownExpanded});
  },

  render: function() {
    var {placeholder} = this.props;
    return (
      <div>
        <a role="button" className="filterable-select" onClick={this.dropdownToggle}>{placeholder}</a>
        {this.state.dropdownExpanded && <div>
          {this.props.children}
        </div>}
      </div>
    );
  }
});

module.exports = {FilterableSelect};
