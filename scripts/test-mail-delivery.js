import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  let fp = path.join(distDir, p);
  if (!fs.existsSync(fp)) fp = path.join(distDir, 'index.html');
  const ext = path.extname(fp);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(fp));
});

const port = 4188;

server.listen(port, async () => {
  console.log(`Contact verification server on http://localhost:${port}`);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: path.join(__dirname, '..', '.chrome-mail-' + Date.now()),
    args: ['--no-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  let emailJsCall = null;
  let emailJsResponse = null;

  page.on('request', req => {
    if (req.url().includes('emailjs.com')) {
      emailJsCall = {
        url: req.url(),
        method: req.method(),
        postData: req.postData() ? JSON.parse(req.postData()) : null,
      };
    }
  });

  page.on('response', resp => {
    if (resp.url().includes('emailjs.com')) {
      emailJsResponse = {
        status: resp.status(),
        statusText: resp.statusText(),
      };
    }
  });

  await page.goto(`http://localhost:${port}/contact`, { waitUntil: 'networkidle0' });

  // Dismiss session loader
  await page.evaluate(() => {
    sessionStorage.setItem('portfolio_loaded', 'true');
    const loader = document.querySelector('[aria-hidden="true"]');
    if (loader && loader.classList.contains('fixed')) loader.remove();
  });

  console.log('Filling form fields...');
  await page.type('#contact-name', 'Verification Lead');
  await page.type('#contact-email', 'prathameshchiddarwar42@gmail.com');
  await page.type('#contact-message', 'Automated test ensuring EmailJS contract and UI status indicators operate flawlessly.');

  console.log('Submitting form...');
  await page.click('button[type="submit"]');

  await new Promise(r => setTimeout(r, 3500));

  console.log('\n--- EMAILJS DISPATCH REPORT ---');
  console.log('EmailJS Endpoint Invoked:', emailJsCall ? emailJsCall.url : 'None');
  console.log('EmailJS Payload Keys:', emailJsCall && emailJsCall.postData ? Object.keys(emailJsCall.postData) : 'N/A');
  if (emailJsCall && emailJsCall.postData && emailJsCall.postData.template_params) {
    console.log('Template Params:', emailJsCall.postData.template_params);
  }
  console.log('EmailJS HTTP Response Status:', emailJsResponse ? emailJsResponse.status : 'N/A');

  const uiBanners = await page.evaluate(() => {
    const s = document.querySelector('[role="status"]');
    const a = document.querySelector('[role="alert"]');
    return {
      statusText: s ? s.innerText : null,
      alertText: a ? a.innerText : null,
    };
  });
  console.log('UI Feedback Banner:', uiBanners);

  await browser.close();
  server.close(() => {
    console.log('Server stopped.');
    process.exit(0);
  });
});

