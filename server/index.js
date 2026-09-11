const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const port = Number(process.env.PORT) || 3001;
const host = process.env.HOST || '0.0.0.0';
const clientDir = path.join(__dirname, '..', 'dist', 'client', 'browser');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2'
};

// Resolves a request path inside clientDir, rejecting any traversal outside it.
function resolveStaticFile(requestPath) {
  const relative = decodeURIComponent(requestPath.split('?')[0]).replace(/^\/+/, '');
  const candidate = path.resolve(clientDir, relative || 'index.html');

  if (candidate !== clientDir && !candidate.startsWith(clientDir + path.sep)) {
    return null;
  }

  return fs.existsSync(candidate) && fs.statSync(candidate).isFile() ? candidate : null;
}

function serveStatic(request, response) {
  const filePath = resolveStaticFile(request.url) ?? path.join(clientDir, 'index.html');

  if (!fs.existsSync(filePath)) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Route not found.' }));
    return;
  }

  response.writeHead(200, {
    'Content-Type': mimeTypes[path.extname(filePath)] || 'application/octet-stream'
  });
  fs.createReadStream(filePath).pipe(response);
}

function convert(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return { error: 'Enter a word or sentence.' };
  }

  return { input: value, result: value.toLowerCase() };
}

const server = http.createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    });
    response.end();
    return;
  }

  if (request.url.split('?')[0] !== '/api/convert') {
    serveStatic(request, response);
    return;
  }

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');

  if (request.method !== 'POST') {
    response.writeHead(405);
    response.end(JSON.stringify({ error: 'Route not found.' }));
    return;
  }

  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    try {
      const { value } = JSON.parse(body);
      const result = convert(value);
      response.writeHead(result.error ? 400 : 200);
      response.end(JSON.stringify(result));
    } catch {
      response.writeHead(400);
      response.end(JSON.stringify({ error: 'Send valid JSON with value and direction.' }));
    }
  });
});

server.listen(port, host, () => {
  console.log(`Alphabet app running at http://${host}:${port}`);
});
