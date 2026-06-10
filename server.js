/**
 * 本地预览服务
 * - 默认从项目根目录提供完整站点
 * - 如需预览构建产物，可用 PORTFOLIO_ROOT=dist npm run preview:dist
 * - /files/ 目录浏览仅供本地使用，Vercel 静态部署不会保留这个能力
 */
import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, process.env.PORTFOLIO_ROOT || '.');
const port = Number(process.env.PORT || 4173);
const host = '127.0.0.1';

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ico': 'image/x-icon',
  '.exe': 'application/octet-stream',
  '.zip': 'application/zip'
};

const safeJoin = (base, targetPath) => {
  const resolvedPath = path.resolve(base, targetPath);
  if (!resolvedPath.startsWith(base)) {
    return null;
  }
  return resolvedPath;
};

const sendResponse = (res, statusCode, headers, body) => {
  res.writeHead(statusCode, headers);
  res.end(body);
};

const createDirectoryListing = async (absoluteDirPath, requestPath) => {
  const entries = await fs.readdir(absoluteDirPath, { withFileTypes: true });
  const items = entries
    .filter((entry) => !entry.name.startsWith('.'))
    .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name, 'zh-Hans-CN'))
    .map((entry) => {
      const nextPath = `${requestPath.replace(/\/$/, '')}/${encodeURIComponent(entry.name)}${entry.isDirectory() ? '/' : ''}`;
      const label = `${entry.name}${entry.isDirectory() ? '/' : ''}`;
      return `<li><a href="${nextPath}">${label}</a></li>`;
    })
    .join('');

  const parentPath = requestPath === '/files/' ? null : requestPath.replace(/[^/]+\/?$/, '');

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Folder Listing</title>
  <style>
    body{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#f3ede2;color:#2f241c;padding:32px}
    a{color:#4e3d30;text-decoration:none}
    a:hover{text-decoration:underline}
    h1{font-size:20px}
    ul{line-height:1.9;padding-left:20px}
    .back{display:inline-block;margin-bottom:16px}
  </style>
</head>
<body>
  <a class="back" href="${parentPath || '/'}">${parentPath ? '← Back' : '← Home'}</a>
  <h1>${requestPath}</h1>
  <ul>${items}</ul>
</body>
</html>`;
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const decodedPath = decodeURIComponent(url.pathname);

    if (decodedPath.startsWith('/files/')) {
      const relativePath = decodedPath.slice('/files/'.length);
      const absolutePath = safeJoin(rootDir, relativePath);

      if (!absolutePath) {
        sendResponse(res, 403, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Forbidden');
        return;
      }

      const stats = await fs.stat(absolutePath);
      if (stats.isDirectory()) {
        const html = await createDirectoryListing(absolutePath, decodedPath);
        sendResponse(res, 200, { 'Content-Type': 'text/html; charset=utf-8' }, html);
        return;
      }
    }

    let requestedFile = safeJoin(rootDir, `.${decodedPath}`);

    if (requestedFile) {
      try {
        let stats = await fs.stat(requestedFile);
        if (stats.isDirectory()) {
          requestedFile = path.join(requestedFile, 'index.html');
          stats = await fs.stat(requestedFile);
        }

        const extname = path.extname(requestedFile).toLowerCase();
        const headers = {
          'Content-Type': mimeTypes[extname] || 'application/octet-stream',
          'Content-Length': stats.size,
          'Cache-Control': extname.match(/\.(mp4|mov|wav|mp3|jpg|jpeg|png|webp|pdf|zip|exe)$/)
            ? 'public, max-age=600'
            : 'no-cache'
        };

        res.writeHead(200, headers);
        if (req.method === 'HEAD') {
          res.end();
          return;
        }

        createReadStream(requestedFile).pipe(res);
        return;
      } catch {
        // Fall through to SPA index.
      }
    }

    const indexHtml = await fs.readFile(path.join(rootDir, 'index.html'));
    sendResponse(res, 200, { 'Content-Type': 'text/html; charset=utf-8' }, indexHtml);
  } catch (error) {
    sendResponse(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, `Server error: ${error.message}`);
  }
});

server.listen(port, host, () => {
  console.log(`Portfolio site running at http://${host}:${port}`);
});
