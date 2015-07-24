require('phantomjs-polyfill');

global.$ = global.jQuery = require('jquery');
global._ = require('lodash');
require('bootstrap');

require('pui-prismjs');

require('./scale')();
require('pui-react-back-to-top/jquery-plugin');

global.React = require('react/addons');

global.UI = require('./components.js');

var a11y = require('react-a11y');
a11y(global.React, {warningPrefix: "REACT-A11Y-ERR "});
if (global.callPhantom) {
  setTimeout(global.callPhantom, 3000);
}
