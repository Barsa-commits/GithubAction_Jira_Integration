const http = require('node:http');

const port = 3001;

function convert(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return { error: 'Enter a word or sentence.' };
  }

  return { input: value, result: value.toLowerCase() };
}

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Content-Type', 'application/json');

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method !== 'POST' || request.url !== '/api/convert') {
    response.writeHead(404);
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

server.listen(port, () => {
  console.log(`Alphabet API running at http://localhost:${port}`);
});
