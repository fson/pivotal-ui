'use strict';

var React = require('react');

var DraggableList = React.createClass({
  render: function () {
    return (
      <ul className='list-group'>
        {this.props.children}
      </ul>
    );
  }
});

var DraggableListItem = React.createClass({
  render: function () {
    return (
      <li className='list-group-item'>{this.props.children}</li>
    );
  }
});

module.exports = {
  DraggableList: DraggableList,
  DraggableListItem: DraggableListItem
};
