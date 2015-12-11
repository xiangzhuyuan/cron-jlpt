var system = require('system');
var args = system.args;
//console.log( args);

if (args.length === 1) {
    console.log('Try to pass some arguments when invoking this script!');
} else {
    args.forEach(function(arg, i) {
        console.log(i + ': ' + arg);
    });
}
var page = require('webpage').create();
page.open(args[1], function (status) {
    console.log(status);
    page.render(args[2]);
    phantom.exit();

});
