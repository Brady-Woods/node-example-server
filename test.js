const http = require('http');
const fs = require('fs');

/*
Documentation:
    const                   : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
    if ... else             : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
    require                 : https://nodejs.org/api/modules.html#modules_require_id
    fs module               : https://nodejs.org/api/fs.html
        readFile            : https://nodejs.org/api/fs.html#fs_filehandle_readfile_options
    http module             : https://nodejs.org/api/http.html
        createServer        : https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener
            listen          : https://nodejs.org/api/http.html#http_server_listen
            incomingMessage : https://nodejs.org/api/http.html#http_class_http_incomingmessage
                            : https://nodejs.org/api/http.html#http_message_method
                headers     : https://nodejs.org/api/http.html#http_message_headers
                url         : https://nodejs.org/api/http.html#http_message_url
            request         : https://nodejs.org/api/http.html#http_class_http_clientrequest
            response        : https://nodejs.org/api/http.html#http_class_http_serverresponse
                writeHead   : https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
                write       : https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback
                end         : https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
    200 response            : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
    Content-Type            : https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
    list of types           : https://www.iana.org/assignments/media-types/media-types.xhtml
*/

http.createServer((request, response) => { // request here is actually an http.incomingMessage
    if (request.url == '/node/testing') { // since I'm hosting my node instance at */node/ then you have to prefix it with /node for this to work
        response.writeHead(200, {"Content-Type": "text/html"});
        let body = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Testing Site</title>
    </head>
    <body>
        <h1>You made it!</h1>
        <p>Welcome!</p>
    </body>
</html>
`;
        response.end(body);
    }
    else if (request.url == '/node/file') {
        fs.readFile(
            './test.html', function(err, html) {
                if (err) {
                    throw err; 
                }
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(html);
                response.end();
            }
        )
    }
    else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write('<!DOCTYPE html>');
        response.write('<html lang="en">');
        response.write('<head>');
        response.write('<meta charset="utf-8">');
        response.write('<title>Node.js Example</title>');
        response.write('</head>');
        response.write('<body>');
        response.write('<h1>Default path be here...</h1>');
        response.write('<p>Try going to another path on the server: <a href="https://sophocles.pixelurbia.com/node/testing">click here</a></p>');
        response.write('<p>This one comes from an actual html file: <a href="https://sophocles.pixelurbia.com/node/file">click here</a></p>');
        response.write('</body>');
        response.write('</html>');
        response.end();
    }
}).listen(8080);