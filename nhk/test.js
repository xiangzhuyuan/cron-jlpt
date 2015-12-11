var sys = require("system");
var args = sys.args;
args.forEach(function(arg, i) {
    console.log(i + ': ' + arg);
});
console.log(args[1]);
args[1].split(',').forEach(function(i, v){
    console.log(i);
});

phantom.exit();