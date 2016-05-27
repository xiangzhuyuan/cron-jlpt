// Render Multiple URLs to file

var RenderUrlsToFile, arrayOfUrls;

var fs = require('fs')
var system = require('system');
var args = system.args;

/*
Render given urls
@param array of URLs to render
@param callbackPerUrl Function called after finishing each URL, including the last URL
@param callbackFinal Function called after finishing everything
*/
RenderUrlsToFile = function(home, urls, callbackPerUrl, callbackFinal) {
    var getFilename, next, page, retrieve, urlIndex, webpage;
    urlIndex = 0;
    webpage = require("webpage");
    page = null;
    // seem like it's a bug
    //var Base_home = fs.workingDirectory
    var Base_home = home
    console.log("This is our working home:" + Base_home)    
    
    getFilename = function(url) {
        return url + ".png";
    };
    next = function(status, url, file) {
        page.close();
        callbackPerUrl(status, url, file);
        return retrieve();
    };
    retrieve = function() {
        var url;
        task_size = urls.length;
        if (task_size > 0) {
            news_id = urls.shift();
            //fix this, get html from /html folder
            url = Base_home + "/html/" + news_id + ".html";
            console.log("doing ... " + urlIndex);
            console.log("current left:  " + task_size);
            urlIndex++;
            page = webpage.create();
            //page.viewportSize = {
            //    width: 800,
            //    height: 600
            //};
            page.settings.userAgent = "Phantom.js bot";
            return page.open("file://" + url, function(status) {
                var file;
                file = getFilename(Base_home + "/png/" + news_id);
                if (status === "success") {
                    return window.setTimeout((function() {
                        page.render(file);
                        return next(status, url, file);
                    }), 200);
                } else {
                    return next(status, url, file);
                }
            });
        } else {
            return callbackFinal();
        }
    };
    return retrieve();
};

var home = '';
if (args.length > 1) {
    args.forEach(function(arg, i) {
        console.log(i + ': ' + arg);
    });
    // get home
    loc = args[0].split('/')
    loc.pop()
    home = loc.join('/')
    arrayOfUrls = args[1].split(',');
    console.log("Allright, let us use phantomjs to capture page....");
    console.log("we get these " + arrayOfUrls.length  +  " url to work: " + arrayOfUrls);
} else {
    console.log("Usage: phantomjs render_multi_url.js [domain.name1, domain.name2, ...]");
    phantom.exit();
}

RenderUrlsToFile(home, arrayOfUrls, (function(status, url, file) {
    if (status !== "success") {
        return console.log("Unable to render '" + url + "'");
    } else {
        return console.log("Rendered '" + url + "' at '" + file + "'");
    }
}), function() {
    return phantom.exit();
});
