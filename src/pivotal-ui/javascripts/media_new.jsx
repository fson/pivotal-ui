'use strict';

var React = require('react/addons');
var _ = require('lodash');
var setClass = React.addons.classSet;

var Media = React.createClass({
  propTypes: {
    children: function(children, propName, componentName) {
      var childNames = _.map(children.children, function(child) {
        if (!child.type instanceof Object) {
          return null;
        }
        return child.type.displayName;
      });

      if (React.Children.count(children) === 3) {
        if (!_.isEqual(childNames, ['MediaLeft', 'MediaBody', 'MediaRight'])){
          return new Error('When you have two images, Media children should be MediaLeft, MediaBody, and MediaRight, in that order.');
        }
      }
      else if (React.Children.count(children) === 2) {
        if (!_.isEqual(childNames, ['MediaLeft', 'MediaBody']) && !_.isEqual(childNames, ['MediaBody', 'MediaRight'])) {
          return new Error('When you have one image, Media children must include a MediaBody and either a MediaLeft or MediaRight. The MediaLeft comes before the body, the MediaRight comes after the MediaBody.');
        }
      }
    },
    stackSize: React.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large'])

  },

  render: function () {
    return (
      <div className="media media-middle">
        {this.props.children}
      </div>
    );
  }
});

var InlineMedia = React.createClass({
  render: function() {
    return (
      <Media alignment="middle">
        <MediaLeft>
          <img src="http://placekitten.com/g/70/70" />
        </MediaLeft>

        <MediaBody>
        Here is my crazY content about my media! I luv my media!
        </MediaBody>

        <MediaRight>
          <img src="http://placekitten.com/g/70/70" />
        </MediaRight>
      </Media>
    )
  }
});

var MediaLeft = global.MediaLeft = React.createClass({
  render: function() {
    return (
      <div className="media-left">
        {this.props.children}
      </div>
    );
  }
});

var MediaRight = global.MediaRight = React.createClass({
  render: function() {
    return (
      <div className="media-right">
        {this.props.children}
      </div>
      );
  }
});

var MediaBody = global.MediaBody = React.createClass({
  render: function() {
    return (
      <div className="media-body">
        {this.props.children}
      </div>
    );
  }
});

var MediaNewExample = React.createClass({
  render: function () {
    return(
      <Media stackSize="another thing">
        <MediaLeft>
          <img src="http://placekitten.com/g/70/70" />
        </MediaLeft>

        <MediaBody>
          Here is my crazY content about my media! I luv my media!
        </MediaBody>

        <MediaRight>
          <img src="http://placekitten.com/g/70/70" />
        </MediaRight>
      </Media>
    );
  }
});

module.exports = {
  MediaNewExample: MediaNewExample
};
