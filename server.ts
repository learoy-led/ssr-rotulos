import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';


// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  console.log('>>> SERVER.TS EJECUTADO <<<');
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  
//AQUI
server.get('/:category/:product', async (req, res, next) => {
  console.log('>>> RUTA PRODUCTO EXPRESS:', req.originalUrl);
  try {
    const { category, product } = req.params;

    const response = await fetch(
      `https://rotuloslearoy-api.onrender.com/api/products/${product}`
    );

    if (!response.ok) {
      return next();
    }

    const productData = await response.json();
    const canonicalCategory = productData.categories?.[0]?.slug;

    if (!canonicalCategory || canonicalCategory === category) {
      return next();
    }

    const canonicalUrl = `/${canonicalCategory}/${product}`;

    console.log(`308: /${category}/${product} → ${canonicalUrl}`);

    return res.redirect(308, canonicalUrl);

  } catch (error) {
    return next(error);
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