import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'dist');
const routes = new Set(['/demo', '/lab', '/privacy', '/terms']);
const types = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
const security = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; worker-src 'self'; manifest-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY'
};

createServer(async (request, response) => {
  const url = new URL(request.url || '/', 'http://127.0.0.1:4173');
  let status = 200;
  let path = decodeURIComponent(url.pathname);
  if (path === '/' || routes.has(path)) path = '/index.html';
  const candidate = normalize(join(root, path));
  let body;
  try {
    if (!candidate.startsWith(root)) throw new Error('outside root');
    body = await readFile(candidate);
  } catch {
    status = 404;
    path = '/404.html';
    body = await readFile(join(root, path));
  }
  const headers = { ...security, 'Content-Type': types[extname(path)] || 'application/octet-stream' };
  if (path.startsWith('/assets/')) headers['Cache-Control'] = path.endsWith('.webp') ? 'public, max-age=86400' : 'public, max-age=31536000, immutable';
  response.writeHead(status, headers);
  response.end(request.method === 'HEAD' ? undefined : body);
}).listen(4173, '127.0.0.1');
