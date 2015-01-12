'use strict';

var React = require('react/addons');
var _ = require('lodash');

var DraggableList = React.createClass({
  getInitialState: function () {
    return {
      placeholderIndex: null
    }
  },
  render: function () {
    var listItemPlaceholder = React.addons.cloneWithProps(<DraggableListItemPlaceholder />, {
      key: 'list-item-placeholder'
    });

    var items = [];
    React.Children.forEach(this.props.children, function(item, index){
      items.push(React.addons.cloneWithProps(item, {
        key: 'list-item-' + index,
        index: index,
        parentBeginDragging: this.beginDragging,
        parentEndDragging: this.endDragging,
        parentUpdatePlaceholder: this.updatePlaceholder
      }));
    }, this);

    if (_.isNumber(this.state.placeholderIndex)) {
      items.splice(this.state.placeholderIndex, 0, listItemPlaceholder);
    }

    return (
      <ul ref='draggableList' className='list-group list-draggable'>
        {items}
      </ul>
    );
  },
  beginDragging: function (index) {
    this.setState({
      placeholderIndex: index
    });
  },
  endDragging: function () {
    this.setState({
      placeholderIndex: null
    });
  },
  updatePlaceholder: function (yPos) {
    var children = this.refs.draggableList.getDOMNode().children;
    var newIndex = children.length;

    _.each(children, function (child, index) {
      if (yPos < child.offsetTop) {
        newIndex = index;
        return false;
      }
    }, this);
    this.setState({
      placeholderIndex: newIndex
    });
  }
});

var DraggableListItem = React.createClass({
  getInitialState: function () {
    return {
      dragging: false,
    };
  },
  beginDragging: function (event) {
    var listItem = this.refs.listItem.getDOMNode();
    listItem.style.backgroundColor = 'papayawhip';
    listItem.style.zIndex = '100';
    listItem.style.width = listItem.clientWidth + 'px';
    listItem.style.left = listItem.offsetLeft + 'px';
    listItem.style.top = listItem.offsetTop + 'px';
    listItem.style.position = 'absolute';

    window.addEventListener("mousemove", this.performDrag);

    this.setState({ 
      dragging: true,
      initialX: event.pageX - listItem.offsetLeft,
      initialY: event.pageY - listItem.offsetTop,
    });
    this.props.parentBeginDragging(this.props.index);
  },
  performDrag: function (event) {
    if (this.state.dragging) {
      var listItem = this.refs.listItem.getDOMNode();
      var left = event.pageX - this.state.initialX;
      var top = event.pageY - this.state.initialY;

      listItem.style.left = left + 'px';
      listItem.style.top = top + 'px';

      this.props.parentUpdatePlaceholder(top);
    }
  },
  endDragging: function () {
    var listItem = this.refs.listItem.getDOMNode();
    listItem.style.position = 'initial';
    listItem.style.backgroundColor = 'initial';
    listItem.style.left = 'initial';
    listItem.style.top = 'initial';
    listItem.style.zIndex = 'initial';

    this.setState({ dragging: false });
    this.props.parentEndDragging();
  },
  render: function () {
    return (
      <li
       ref="listItem"
       className='list-group-item pln'
       onMouseDown={this.beginDragging}
       onMouseUp={this.endDragging}>
        <div className='draggable-grip mhl'>
          <i className='fa fa-ellipsis-v mrs'/>
          <i className='fa fa-ellipsis-v'/>
        </div>

        {this.props.children}
      </li>
    );
  }
});

var DraggableListItemPlaceholder = React.createClass({
  render: function () {
    return (
      <li
       className='list-group-item pln bg-brand-3'>
        &nbsp;
      </li>
    );
  }
});

module.exports = {
  DraggableList: DraggableList,
  DraggableListItem: DraggableListItem
};
