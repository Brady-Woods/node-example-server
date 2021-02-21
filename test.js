const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  const { headers, method, url } = request;
    if (request.url == '/node/testing') { // since I'm hosting my node instance at */node/ then you have to prefix it with /node for this to work
        response.writeHeader(200, {"Content-Type": "text/html"});
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
                response.writeHeader(200, {"Content-Type": "text/html"});
                response.write(html);
                response.end();
            }
        )
    }
    else {
        response.writeHeader(200, {"Content-Type": "text/html"});
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