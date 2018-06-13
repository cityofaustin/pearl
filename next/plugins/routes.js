const routes = module.exports = require('next-routes-with-locale')({ locale: 'en' });

routes
  .add('editPage', 'en', '/pages/:id', 'pages/_id')
