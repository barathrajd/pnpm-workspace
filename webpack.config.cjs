const path = require('node:path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const devMode = process.env.NODE_ENV !== 'production';
const isProduction = process.env.NODE_ENV === 'production';

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

console.log(envKeys);

const config = {
  // Your Webpack configuration here
  mode: 'development',
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: false,
  },
  entry: './src/index.tsx',
  devtool: devMode ? 'eval-source-map' : false,
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: 'http://localhost:3000/',
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
                dynamicImport: false,
                privateMethod: false,
                functionBind: false,
                exportDefaultFrom: false,
                exportNamespaceFrom: false,
                decorators: false,
                decoratorsBeforeExport: false,
                topLevelAwait: false,
                importMeta: false,
              },
              target: 'es5',
              loose: false,
              externalHelpers: false,
              // Requires v1.2.50 or upper and requires target to be es2016 or upper.
              keepClassNames: false,
            },
            minify: false,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)/,
        type: 'asset/resource',
      },
      {
        // If you enable `experiments.css` or `experiments.futureDefaults`, please uncomment line below
        // type: "javascript/auto",
        test: /\.(sa|sc|c)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin(envKeys),
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  // other configuration options
};

module.exports = config;
