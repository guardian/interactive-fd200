// Javascript that is inline. Should be used for anything that needs to be immediate
window.$ = require('./vendor/jquery.js');

var share = require('./modules/share.js');
var data = require('./modules/data.js');
var scroll = require('./modules/scroll.js');

share.init();
data.init();
scroll.init();
