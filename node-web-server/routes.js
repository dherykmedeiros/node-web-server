const fs = require('fs');
const path = require('path');


function handleRoutes(req, res) {
    if (req.url === '/about') {
        serveHTML('about.html', res);
    } else if (req.url === '/') {
        serveHTML('index.html', res);
    } else {
        serveHTML('404.html', res, 404);
    }
}


function serveHTML(fileName, res, statusCode = 200) {
    const filePath = path.join(__dirname, 'public', fileName);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Erro no servidor');
        } else {
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
}

module.exports = { handleRoutes };
