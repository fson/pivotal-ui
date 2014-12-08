'use strict';

var _ = require('lodash');
var React = require('react');

/* Pivotal UI Component */
var ListGroupItem = React.createClass({
  render: function () {
    return (
      <li className="list-group-item">{this.props.children}</li>
    );
  }
});

/* Pivotal UI Component */
var ListGroup = React.createClass({
  render: function () {
    var classes = this.props.className + " list-group";
    return (
      <ul className={classes}>{this.props.children}</ul>
    );
  }
});

/* Custom Component, NOT part of Pivotal UI 
 *   - composed of PUI Components
 *   - manages state of listGroup
 */
var CustomUpdatingListGroup = React.createClass({
  getInitialState: function () {
    return {
      itemValues: []
    }
  },

  addItem: function () {
    this.setState({itemValues: this.state.itemValues.concat(Math.floor(Math.random() * 100))});
  },

  render: function () {
    var listItems = {};
    // var listItems = []; // "Children" can be either array or object/hash

    _.each(this.state.itemValues, function(itemValue) {
      // If using a hash for children, they key will become the component's key
      listItems['item-' + itemValue] = (
        <ListGroupItem>{itemValue}</ListGroupItem>
      );

      // If using an array for children, key must be set as a prop
      // listItems.push(
        // <ListGroupItem key={'item' + itemValue}>{itemValue}</ListGroupItem>
      // );
    });

    return (
      <div className="custom-updating-list-group">
        <ListGroup className="mtxl">
          {listItems}
        </ListGroup>
        <button onClick={this.addItem}>Add Item</button>
      </div>
    );
  }
});

module.exports = CustomUpdatingListGroup;
