module.exports = {
  configureWebpack: {
    devServer: {
      port: 8000,
      // open: true,
      host:"localhost",
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
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
