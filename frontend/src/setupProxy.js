const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://res-proiect.onrender.com',
      changeOrigin: true,
    })
  );
};

// https://res-proiect.onrender.com