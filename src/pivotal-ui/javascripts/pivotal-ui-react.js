global.$ = global.jQuery = require('jquery');
require('bootstrap');
require('modernizr');
require('prism');

require('./scale')();
require('./back-to-top')();

global.React = require('react');
global.TableSortable = global.React.createFactory(require('./table-sortable.jsx'));