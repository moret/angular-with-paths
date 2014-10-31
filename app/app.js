var sys = require('sys');
var http_server = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var http_port = 8000;

function serveFile(response, fullPath) {
    fs.readFile(fullPath, 'binary', function(err, file) {
        if (!err) {
            sys.puts('SERVING ' + fullPath);
            response.writeHeader(200);
            response.write(file, 'binary');
            response.end();
        } else {
            serveFile(response, path.join(process.cwd(), '/public/index.html'));
        }
    });
};

http_server.createServer(function(request, response) {
    var requestPath = url.parse(request.url).pathname;
    var fullPath = path.join(process.cwd(), '/public', requestPath);
    sys.puts('GET ' + requestPath);
    serveFile(response, fullPath);
}).listen(http_port);
sys.puts('open http://localhost:' + http_port);
