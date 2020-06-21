const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const minifyHtmlOptions = {
  removeComments: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  useShortDoctype: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeRedundantAttributes: true
};

const jsPath = './src/js';
const htmlPath = `${__dirname}/src/html`;
const favIconPath = './src/img/icons';

module.exports = {
  mode: 'production',

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
    filename: '[name].bundle-[hash:8].js',
    publicPath: ''
  },

  module: {
    rules: [
      // JS //
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      // CSS //
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      // FONTS //
      {
        test: /\.(ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: { name: 'fonts/[name]-[hash:8].[ext]' }
        }]
      },

      // IMAGES //
      {
        test: /\.(png|jp(e*)g|gif|svg)$/,
        use: [
          { loader: 'url-loader',           options: { limit: 10000 } },
          { loader: 'image-webpack-loader', options: { bypassOnDebug: true } }
        ]
      },
    ]
  },

  optimization: {
    minimizer: [
      // min CSS
      new OptimizeCSSAssetsPlugin({}),

      // min js
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          output: { comments: false }
        }
      }),
    ]
  },

  plugins: [
    // add progress bar
    new WebpackBar(),

    // remove 'dist/' before new build
    new CleanWebpackPlugin(),

     // gzip compression
    new CompressionPlugin({ algorithm: 'gzip' }),

    // HTML - MPA //
    // index.html
    new HtmlWebpackPlugin({
      title: 'Картина мира | Главная',
      template: `${htmlPath}/index.html`,
      filename: 'index.html',
      minify: minifyHtmlOptions,
      chunks: ['index']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | О нас',
      template: `${htmlPath}/about.html`,
      filename: 'about.html',
      minify: minifyHtmlOptions,
      chunks: ['about']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Игровое кино',
      template: `${htmlPath}/cinema.html`,
      filename: 'cinema.html',
      minify: minifyHtmlOptions,
      chunks: ['cinema']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Контакты',
      template: `${htmlPath}/contacts.html`,
      filename: 'contacts.html',
      minify: minifyHtmlOptions,
      chunks: ['contacts']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Корпоративное кино',
      template: `${htmlPath}/corporate.html`,
      filename: 'corporate.html',
      minify: minifyHtmlOptions,
      chunks: ['corporate']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Реклама',
      template: `${htmlPath}/market.html`,
      filename: 'market.html',
      minify: minifyHtmlOptions,
      chunks: ['market']
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Наши услуги',
      template: `${htmlPath}/servicies.html`,
      filename: 'servicies.html',
      minify: minifyHtmlOptions,
      chunks: ['servicies']
    }),

    // css-bundle
    new MiniCssExtractPlugin({ filename: '[name].bundle-[hash:8].css' }),

    // add jQuery
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),

    // IMAGES, FONTS, robot.txt
    new CopyWebpackPlugin([
      { from: 'src/img',   to: 'img' },
      { from: 'robots.txt', to: '' },
    ]),

    // add favicons
    new FaviconsWebpackPlugin({
      logo: `${favIconPath}/favicon.png`,
      publicPath: './',
      prefix: '',
      statsFilename: 'iconstats-[hash:8].json',
      background: '#fff'
    }),
  ]
};
