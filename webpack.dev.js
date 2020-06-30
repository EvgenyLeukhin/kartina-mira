const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const htmlPathRus = `${__dirname}/src/html/rus`;
const htmlPathEng = `${__dirname}/src/html/eng`;
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
  entry: { index: './src/js/index.js' },
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
      template: `${htmlPathRus}/index.html`,
      filename: 'index.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | О нас',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathRus}/about.html`,
      filename: 'about.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Игровое кино',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathRus}/cinema.html`,
      filename: 'cinema.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Контакты',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathRus}/contacts.html`,
      filename: 'contacts.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Корпоративное кино',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathRus}/corporate.html`,
      filename: 'corporate.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Реклама',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathRus}/market.html`,
      filename: 'market.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Наши услуги',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathRus}/servicies.html`,
      filename: 'servicies.html',
    }),


    ///////////////////////// ENG //////////////////////////
    new HtmlWebpackPlugin({
      title: 'Kartina Mira | Home',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathEng}/index-eng.html`,
      filename: 'index-eng.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Kartina Mira | About',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathEng}/about-eng.html`,
      filename: 'about-eng.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Kartina Mira | Live-action films',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathEng}/cinema-eng.html`,
      filename: 'cinema-eng.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Kartina Mira | Contacts',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathEng}/contacts-eng.html`,
      filename: 'contacts-eng.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Kartina Mira | Corporate films',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathEng}/corporate-eng.html`,
      filename: 'corporate-eng.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Kartina Mira | Advertising',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathEng}/market-eng.html`,
      filename: 'market-eng.html',
    }),

    new HtmlWebpackPlugin({
      title: 'Kartina Mira | Services',
      favicon: `${favIconPath}/favicon.ico`,
      template: `${htmlPathEng}/servicies-eng.html`,
      filename: 'servicies-eng.html',
    }),
    ///////////////////////// ENG //////////////////////////


    // add jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    // auto-open browser //
    new OpenBrowserPlugin({ url: 'http://localhost:8888' }),
  ]
};
