// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.

// Define HTTP proxies to your custom API backend(代理到本地服务器)
// https://github.com/chimurai/http-proxy-middleware
const proxyOption = {
  target:       process.env.PROXY_TARGET || 'http://localhost:8910',
  changeOrigin: true
};

module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  // NOTE: In development, we use an explicit public path when the assets
  // are served webpack by to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  development: (config) => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    proxyTable:           {
      '/api':                 Object.assign({pathRewrite: {'^/api': ''}}, proxyOption),
      '/Content/':            proxyOption,
      '/UeditorHandler.ashx': proxyOption
    },
    mockConfig:           {
      enable:  true,
      options: {
        successRate: 1,
        log:         require('debug')('app:MockServer')
      }
    }
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: (config) => ({
    compiler_public_path:     '/',
    compiler_fail_on_warning: false,
    compiler_hash_type:       'chunkhash',
    compiler_devtool:         null,
    compiler_stats:           {
      chunks:       true,
      chunkModules: true,
      colors:       true
    }
  })
};
