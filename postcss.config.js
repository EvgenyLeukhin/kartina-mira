module.exports = {
  plugins: [
    require('autoprefixer')(),
    require('cssnano')({
      discardComments: { removeAll: true }
    })
  ]
};
