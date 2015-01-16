'use strict';

var React = require('react/addons');
var _ = require('lodash');

var arraySwapPositions = function arraySwapPositions(arr, x, y) {
  arr[x] = arr.splice(y, 1, arr[x])[0];
}

var DraggableList = React.createClass({
  getInitialState: function () {
    return {
      targetIndex: null
    }
  },
  componentWillMount: function () {
    var copyOfChildren = React.Children.map(this.props.children, function(child) {
      return React.addons.cloneWithProps(child);
    });
    console.log("original children", this.props.children);
    console.log("copied children", copyOfChildren);

    this.setState({
      listItems: copyOfChildren
    });

    var self = this;
    window.addEventListener('keydown', function () {
      var copy = React.Children.map(self.state.listItems, function(child) {
        return React.addons.cloneWithProps(child);
      });

      arraySwapPositions(copy, 0, 1);
      this.setState({
        listItems: copy
      });
    });
  },
  render: function () {
    var listItemPlaceholder = React.addons.cloneWithProps(<DraggableListItemPlaceholder />, {
      key: 'list-item-placeholder'
    });

    var items = [];
    React.Children.forEach(this.state.listItems, function(item, index){
      items.push(React.addons.cloneWithProps(item, {
        key: 'list-item-' + index,
        index: index,
        parentBeginDragging: this.beginDragging,
        parentEndDragging: this.endDragging,
        parentReorderList: this.reorderList
      }));
    }, this);

    if (_.isNumber(this.state.targetIndex)) {
      items.splice(this.state.targetIndex, 0, listItemPlaceholder);
    }

    return (
      <ul ref='draggableList' className='list-group list-draggable'>
        {items}
      </ul>
    );
  },
  beginDragging: function (index) {
    this.setState({
      targetIndex: index
    });
  },
  endDragging: function () {
    this.setState({
      targetIndex: null
    });
  },
  reorderList: function (yPos) {
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

      this.props.parentReorderList(top);
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
