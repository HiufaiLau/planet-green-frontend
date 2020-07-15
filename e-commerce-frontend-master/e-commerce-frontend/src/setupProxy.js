const proxy = require('http-proxy-middleware');

const { createProxyMiddleware } = proxy;

module.exports = (app) => {
  app.use(
    ['/api'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    })
  );
};
