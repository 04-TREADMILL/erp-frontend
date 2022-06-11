module.exports = {
  configureWebpack: {
    devServer: {
      port: 8000,
      // open: true,
      host:"localhost",
      proxy: {
        '/api': {
          target: 'http://43.142.159.174:8080',
          ws: true,
          changeOrigin: true,
          pathRewrite:{
            '^/api': '/'
          }
        }
      }
    }
  }
};
