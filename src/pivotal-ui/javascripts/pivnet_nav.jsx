'use strict';

var React = require('react');
var _ = require('lodash');

var PivnetNav = React.createClass({
  render: function () {
    var navLinks = _.map(this.props.navLinks, function(link) {
      return (
        <li>
          <a className='type-neutral-11 type-sm' href={link.href}>{link.name}</a>
        </li>
      );
    });

    return (
      <div className='bg-shadow-1 ptm pbl'>
        <div className='container'>
          <div className="pull-left">
            <a className="h3 type-neutral-11 em-default" href="/">
              <img className="pivnet-logo" src="http://placehold.it/50x50"/>
              <span className="sr-only">
                Pivotal Network
              </span>
            </a>
          </div>
          <div className="em-alt mtn pull-right">
            <ul className="list-inline pull-left mbn mrxl lhl mtn">
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = {
  PivnetNav: PivnetNav
};
