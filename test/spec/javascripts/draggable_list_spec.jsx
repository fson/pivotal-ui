'use strict';

var $ = require('jquery');
var React = require('react');

var DraggableList = require('../../../src/pivotal-ui/javascripts/draggable-list.jsx').DraggableList;
var DraggableListItem = require('../../../src/pivotal-ui/javascripts/draggable-list.jsx').DraggableListItem;

describe('DraggableList', function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <DraggableList>
        <DraggableListItem>
          Get me out of here!
        </DraggableListItem>

        <DraggableListItem>
          LOL
        </DraggableListItem>
      </DraggableList>,
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders a list group of all items", function() {
    expect($('#container ul.list-group li').length).toEqual(2);
    expect($('#container li.list-group-item').eq(0)).toHaveText("Get me out of here!");
    expect($('#container li.list-group-item').eq(1)).toHaveText("LOL");
  });
});
