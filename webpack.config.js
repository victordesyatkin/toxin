"use strict";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const StylelintPlugin = require('stylelint-webpack-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const nth = {};
nth.dir = {
  src: path.resolve(__dirname, "src"),
  blocks: path.resolve(__dirname, "src", "blocks"),
  pages: path.resolve(__dirname, "src", "pages"),
};

const js = {};

module.exports = (env, argv = {}) => {
  const { mode = 'development' } = argv;
  const pages = [];
  fs.readdirSync(nth.dir.pages).forEach((file) => {
    pages.push(file);
  });
  const htmlPlugins = pages.map((fileName) => {
    js[fileName] = `${nth.dir.pages}/${fileName}/${fileName}.js`;
    return new HtmlWebpackPlugin({
      getData: () => {
        try {
          return JSON.parse(
            fs.readFileSync(`${nth.dir.pages}/${fileName}/data.json`, 'utf8')
          );
        } catch (e) {
          console.warn(`data.json was not provided for page ${fileName}`);
          return {};
        }
      },
      filename: `${fileName}.html`,
      template: `${nth.dir.pages}/${fileName}/${fileName}.pug`,
      chunks: [fileName],
      alwaysWriteToDisk: true,
      inject: true,
      hash: true,
      meta: {
        viewport: 'initial-scale=1.0, width=device-width',
        'msapplication-TileColor': '#da532c',
        'theme-color': '#ffffff',
      },
    });
  });

  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';
  const getStyleLoaders = () => {
    return [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      ...htmlPlugins,
      new StylelintPlugin({
        configFile: path.resolve(__dirname, '.stylelintrc.json'),
        context: path.resolve(__dirname),
        files: 'src/**/*.(s(c|a)ss|css)',
        fix: true,
      }),

      new webpack.HotModuleReplacementPlugin(),
    ];
    if (isProduction) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
          chunkFilename: '[id].[contenthash].css',
        }),
        new CssnanoPlugin({
          sourceMap: true,
        })
      );
    }

    return plugins;
  };

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isDevelopment ? 'eval-source-map' : undefined,
    entry: { ...js },
    output: {
      filename: '[name].js',
      pathinfo: isDevelopment,
    },
    resolve: {
      modules: ['src', 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: true,
              },
            },
          ],
        },
        {
          test: /\.(ico|png|svg|xml|json|webmanifest)$/,
          include: /favicon/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: './assets/favicon/',
              name: '[name].[ext]',
            },
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          exclude: /(fonts|favicon)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './assets/images/',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2|svg)$/,
          include: /fonts/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './assets/fonts/',
                name: isDevelopment
                  ? '[name].[ext]'
                  : '[name].[contenthash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [
            ...getStyleLoaders(),
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer', 'postcss-preset-env'],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },

    plugins: getPlugins(),

    devServer: {
      hot: true,
      open: true,
      watchContentBase: true,
    },
  };
};
