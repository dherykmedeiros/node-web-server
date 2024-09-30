const fs = require('fs');
const path = require('path');


const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
};


function serveStatic(filePath, req, res, next) {
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
               
                next();
            } else {
                
                res.writeHead(500);
                res.end(`Erro no servidor: ${err.code}`);
            }
        } else {
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
}

module.exports = { serveStatic };
