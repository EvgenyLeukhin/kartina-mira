const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const jsPath = './src/js';
const htmlPath = `${__dirname}/src/html`;
const favIconPath = './src/img/icons';

module.exports = {
  mode: 'development',

  // dev server
  watch: true,
  devServer: {
    port: 8888,
    overlay: { warnings: false, errors: true }
  },
  devtool: 'cheap-module-source-map',
  watchOptions: { ignored: /node_modules/ },

  // input-output
  entry: {
    about:     `${jsPath}/about.js`,
    cinema:    `${jsPath}/cinema.js`,
    contacts:  `${jsPath}/contacts.js`,
    corporate: `${jsPath}/corporate.js`,
    index:     `${jsPath}/index.js`,
    market:    `${jsPath}/market.js`,
    servicies: `${jsPath}/servicies.js`,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: ''
  },

  module: {
    rules: [
      // JS //
      { test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader' },

      // CSS //
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',    options: { sourceMap: true } },
          { loader: 'sass-loader',   options: { sourceMap: true } }
        ]
      },

      // FONTS //
      {
        test: /\.(ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: { name: 'fonts/[name].[ext]' }
        }]
      },

      // convert small IMAGES to base-64 //
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: [
          { loader: 'url-loader', options: { limit: 10000 } },
        ]
      },
    ]
  },

  plugins: [
    // copy IMAGES //
    new CopyWebpackPlugin([
      { from: 'src/img', to: 'img' }
    ]),

    // HTML - MPA //
    new HtmlWebpackPlugin({
      title: 'Картина мира | Главная',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPath}/index.html`,
      filename: 'index.html',
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | О нас',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPath}/about.html`,
      filename: 'about.html',
      chunks: ['about']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Игровое кино',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPath}/cinema.html`,
      filename: 'cinema.html',
      chunks: ['cinema']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Контакты',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPath}/contacts.html`,
      filename: 'contacts.html',
      chunks: ['contacts']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Корпоративное кино',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPath}/corporate.html`,
      filename: 'corporate.html',
      chunks: ['corporate']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Реклама',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPath}/market.html`,
      filename: 'market.html',
      chunks: ['market']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Наши услуги',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPath}/servicies.html`,
      filename: 'servicies.html',
      chunks: ['servicies']
    }),


    // add jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    // auto-open browser //
    new OpenBrowserPlugin({ url: 'http://localhost:8888' }),
  ]
};
