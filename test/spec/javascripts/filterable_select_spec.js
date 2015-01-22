'use strict';
require('./spec_helper');
var $ = require('jquery');
var React = require('react/addons');

var {FilterableSelect} = require('../../../src/pivotal-ui/javascripts/filterable-select');
var {Option} = require('../../../src/pivotal-ui/javascripts/option');

describe("FilterableSelect", function() {
  beforeEach(function() {
    this.node = $('<div id="container"></div>').appendTo('body').get(0);

    React.render(
      <FilterableSelect name="state" placeholder="Select a state">
        <Option value="CA">California</Option>
        <Option value="NY">New York</Option>
      </FilterableSelect>,
      this.node
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  });

  it("renders a dropdown toggle", function() {
    expect($('#container .filterable-select')).toExist();
    expect($('#container .filterable-select')).toContainText('Select a state');
  });

  describe("clicking the dropdown toggle", function() {
    beforeEach(function() {
      $('#container .filterable-select').simulate('click');
    });

    it("renders the options", function() {
      var options = $('#container option').map(function() { return $(this).text(); }).toArray();
      expect(options).toEqual(['California', 'New York']);
    });

    describe("entering some text in the filter", function() {
      
    });
  });});
