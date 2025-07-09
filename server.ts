import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import https from 'https';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
server.get('/sitemap.xml', async (req, res) => {
  try {
    const apiUrl = 'https://rotuloslearoy-api.onrender.com/api/sitemap.xml';

    https.get(apiUrl, (apiRes) => {
      if (apiRes.statusCode !== 200) {
        res.status(apiRes.statusCode ?? 500).send('Error al obtener sitemap');
        return;
      }

      res.setHeader('Content-Type', 'application/xml');
      apiRes.pipe(res); 
    }).on('error', (err) => {
      console.error('Error al obtener sitemap:', err);
      res.status(500).send('Error interno');
    });

  } catch (error) {
    console.error('Fallo al servir sitemap:', error);
    res.status(500).send('Error interno del servidor');
  }
});

 // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

