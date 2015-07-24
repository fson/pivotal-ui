var system = require('system');
var webPage = require('webpage');
var args = system.args;

var page = webPage.create();
var messages = [];
page.onConsoleMessage = function(message) {
  messages.push(message);
};
page.onCallback = function() {
  system.stdout.write(messages.join('\n'));
  phantom.exit(0);
};

var port = 8000;
page.open('http://localhost:' + port + '/react.html');
