global.$ = global.jQuery = require('jquery');
require('bootstrap');
require('modernizr');
require('prism');

require('./scale')();
require('./back-to-top')();

global.React = require('react');
global.TableSortable = global.React.createFactory(require('./react_components/table-sortable.jsx'));
global.CustomUpdatingListGroup = global.React.createFactory(require('./react_components/foo.jsx'));
