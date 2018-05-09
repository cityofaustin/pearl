const nodeExternals = require('webpack-node-externals');

module.exports = {
  head: {
    title: 'pearl',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: 'CMS Author Interface for austin.gov' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css' }
    ]
  },
  router: {
    linkActiveClass: 'active',
  },
  env: {
    CMS_API: process.env.CMS_API,
  },
  loading: { color: '#5269A8' },
  modules: [
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/api/graphiql': {
      target: process.env.CMS_GRAPHIQL,
      logLevel: 'debug',
    }
  },
  build: {
    watch: ['schemas'],
    vendor: ['axios', 'vue-awesome'],
    extend (config, { isDev, isClient, isServer }) {
      /*
      ** Run ESLint on save
      */
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i, /^vue-awesome/]
          })
        ]
      }
    }
  }
}
