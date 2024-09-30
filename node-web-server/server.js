const http = require('http');
const { handleRoutes } = require('./routes');
const { serveStatic } = require('./staticHandler');
const path = require('path');


const server = http.createServer((req, res) => {
    
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    serveStatic(filePath, req, res, () => {
        
        handleRoutes(req, res);
    });
});


server.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
