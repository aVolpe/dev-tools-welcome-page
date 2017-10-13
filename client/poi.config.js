module.exports = (options, req) => ({
  entry: './src/index.js',
  html: {
    title: 'Dev Ops Portal',
    template: `${__dirname}/src/index.html`,
  },
  devServer: {
    proxy: 'http://localhost:4300/api'
  }
})

