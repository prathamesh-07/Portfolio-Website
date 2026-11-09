import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const screenshotsDir = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.bin': 'application/octet-stream',
  '.gltf': 'model/gltf+json',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(distDir, reqPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500);
      res.end('Error loading file');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const port = 4199;
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

server.listen(port, async () => {
  console.log(`Static server running on port ${port}`);

  const viewports = [
    { name: 'homepage-375.png', width: 375, height: 812 },
    { name: 'homepage-768.png', width: 768, height: 1024 },
    { name: 'homepage-1440.png', width: 1440, height: 900 },
    { name: 'about-1440.png', url: '/about', width: 1440, height: 900 },
    { name: 'projects-1440.png', url: '/projects', width: 1440, height: 900 },
    { name: 'contact-1440.png', url: '/contact', width: 1440, height: 900 },
  ];

  try {
    for (const vp of viewports) {
      const outPath = path.join(screenshotsDir, vp.name);
      const targetUrl = `http://localhost:${port}${vp.url || '/'}`;
      console.log(`Capturing ${vp.name} (${vp.width}x${vp.height}) from ${targetUrl}...`);
      await execFileAsync(chromePath, [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        `--window-size=${vp.width},${vp.height}`,
        `--screenshot=${outPath}`,
        '--hide-scrollbars',
        targetUrl,
      ]);
    }
    console.log('All screenshots captured successfully.');
  } catch (err) {
    console.error('Screenshot error:', err);
  } finally {
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  }
});
