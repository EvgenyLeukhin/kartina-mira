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

const HOST_URL = 'https://evgenyleukhin.github.io/kartina-mira';
const TITLE = 'Картина мира';
const DESCRIPTION = 'Кинокомпания разрабатывает сценарные концепции и обеспечивает полный комплекс услуг в области аудиовизуального производства – от подготовки к съёмкам до post-production любой сложности, включая 3D-анимацию и озвучивание';

const metaInfo = {
  // mobile
  appleMobileBarstyle: { name: 'apple-mobile-web-app-status-barstyle', content: 'black-translucent' },

  // basic
  description:   { name: 'description',    content: DESCRIPTION },
  image:         { name: 'image',          content: `${HOST_URL}/cover.png`, },
  language:      { name: 'language',       content: 'RU' },
  url:           { name: 'url',            content: HOST_URL },
  identifierURL: { name: 'identifier-URL', content: HOST_URL },
  keywords: {
    name: 'keywords',
    content: 'картина мира, кинокомпания, кинопроизводство, видео на заказ',
  },

  // og tags
  ogUrl:         { property: 'og:url',          content: HOST_URL },
  ogType:        { property: 'og:type',         content: 'website' },
  ogTitle:       { property: 'og:title',        content: TITLE },
  ogImage:       { property: 'og:image',        content: `${HOST_URL}/cover.png` },
  ogImageType:   { property: 'og:image:type',   content: 'image/png' },
  ogImageHeight: { property: 'og:image:height', content: '1024' },
  ogImageWidth:  { property: 'og:image:width',  content: '512' },
  ogSiteName:    { property: 'og:site_name',    content: TITLE },
  ogLocate:      { property: 'og:locate',       content: 'ru_RU' },
  ogDescription: { property: '10og:description',  content: DESCRIPTION },

  // google
  itempropName:        { itemprop: 'name',        content: TITLE },
  itempropDescription: { itemprop: 'description', content: DESCRIPTION },
  itempropImage:       { itemprop: 'image',       content: `${HOST_URL}/cover.png` },

  // twitter
  twitterTitle:       { name: 'twitter:title',       content: TITLE },
  twitterDescription: { name: 'twitter:description', content: DESCRIPTION },
  twitterUrl:         { name: 'twitter:url',         content: HOST_URL },
  twitterSite:        { name: 'twitter:site',        content: HOST_URL },
  twitterCard:        { name: 'twitter:card',        content: 'summary_large_image' },
  twitterImageSrc:    { name: 'twitter:image:src',   content: `${HOST_URL}/cover.png` },
}

const htmlPath = `${__dirname}/src/html`;
const favIconPath = './src/img/icons';

module.exports = {
  mode: 'production',

  // input-output
  entry: { index: './src/js/index.js' },
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
      meta: metaInfo,
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | О нас',
      template: `${htmlPath}/about.html`,
      filename: 'about.html',
      minify: minifyHtmlOptions,
      meta: metaInfo,
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Игровое кино',
      template: `${htmlPath}/cinema.html`,
      filename: 'cinema.html',
      minify: minifyHtmlOptions,
      meta: metaInfo,
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Контакты',
      template: `${htmlPath}/contacts.html`,
      filename: 'contacts.html',
      minify: minifyHtmlOptions,
      meta: metaInfo,
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Корпоративное кино',
      template: `${htmlPath}/corporate.html`,
      filename: 'corporate.html',
      minify: minifyHtmlOptions,
      meta: metaInfo,
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Реклама',
      template: `${htmlPath}/market.html`,
      filename: 'market.html',
      minify: minifyHtmlOptions,
      meta: metaInfo,
    }),

    new HtmlWebpackPlugin({
      title: 'Картина мира | Наши услуги',
      template: `${htmlPath}/servicies.html`,
      filename: 'servicies.html',
      minify: minifyHtmlOptions,
      meta: metaInfo,
    }),

    // css-bundle
    new MiniCssExtractPlugin({ filename: '[name].bundle-[hash:8].css' }),

    // add jQuery
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),

    // IMAGES, FONTS, robot.txt
    new CopyWebpackPlugin([
      { from: 'src/img',   to: 'img' },
      { from: 'robots.txt', to: '' },
      { from: 'src/img/cover.png', to: '' },
      { from: 'src/img/kartina_mira.jpg', to: '' },
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
