var fs = require('fs'),
    html_list = new Array();

var Base_home = "/Users/zhuyuan.xiang/workspace/cron-jlpt/nhk/";


var file_list = fs.list(Base_home);
//console.log(file_list);
for (var x = 0; x < file_list.length; x++) {
    // Note: If you didn't end path with a slash, you need to do so here.
    var file = file_list[x];
    //var file = Base_home + file_list[x];
    //console.log(file);
    if (fs.isFile(file) && file.indexOf('.html') != -1) {
        // Do something
        console.log(file);
        html_list.push(file);
    }
}
console.log(html_list.length);

for (var j = 0; j < html_list.length; j++) {
    console.log('do the ' + j + ' page ...');
    file_address = "http://www.xiangzhuyuan.com/nhk/k10010297751000.html";
    //file_address = "http://localhost:63342/cron-jlpt/nhk/" + html_list[j];
    file_name = "./" + html_list[j].split('.')[0] + ".png";
    //file_name = Base_home + html_list[j].split('.')[0] + ".png";
    console.log(html_list[j]);
    console.log(file_address);
    console.log(file_name);
    var page = require('webpage').create();
    page.open(file_address, function (status) {
        console.log(status);
        console.log(file_name);
        page.render(file_name, {format: 'png', quality: '100'});
        phantom.exit();
    })
}


