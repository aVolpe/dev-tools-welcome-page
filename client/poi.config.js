module.exports = (options, req) => ({
  entry: './src/index.ts',
  html: {
    title: 'Dev Ops Portal',
    template: `${__dirname}/src/index.html`,
  },
  devServer: {
    proxy: 'http://localhost:4300/api'
  },
  presets: [
    require('poi-preset-typescript')({
      exclude: /node_modules/,
      loaderOptions: {
        appendTsSuffixTo: [/\.vue$/]
      }
    })
  ]
})

