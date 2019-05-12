const express = require('express');
const proxy = require('http-proxy-middleware');
const { parse } = require('url');
const next = require('next');
const { join } = require('path');

const port = parseInt(process.env.PORT, 10) || 3333;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        // client-side Sentry init
        const { Sentry } = require('./utils/sentry')(app.buildId);

        server.use(Sentry.Handlers.requestHandler());

        server.use("/api", proxy({
            target: 'https://m.easyrentcars.com',
            changeOrigin: true
        }));

        server.get('/robots.txt|/sitemap.xml|/favicon.ico', (req, res) => {
            const parsedUrl = parse(req.url, true);
            const path = join(__dirname, 'static', parsedUrl.pathname);
            return app.serveStatic(req, res, path)
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.use(Sentry.Handlers.errorHandler());

        server.listen(port, '0.0.0.0', err => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        });
    });
