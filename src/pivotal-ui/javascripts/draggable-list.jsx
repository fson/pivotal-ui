'use strict';

var React = require('react');

var DraggableList = React.createClass({
  render: function () {
    return (
      <ul className='list-group list-draggable'>
        {this.props.children}
      </ul>
    );
  }
});

var DraggableListItem = React.createClass({
  render: function () {
    return (
      <li className='list-group-item pln'>
        <div className='draggable-grip mhl'>
          <i className='fa fa-ellipsis-v mrs'/>
          <i className='fa fa-ellipsis-v'/>
        </div>

        {this.props.children}
      </li>
    );
  }
});

module.exports = {
  DraggableList: DraggableList,
  DraggableListItem: DraggableListItem
};
