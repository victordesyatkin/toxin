'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const nth = {};
nth.dir = {
  src: path.resolve(__dirname, 'src'),
  blocks: path.resolve(__dirname, 'src', 'blocks'),
  pages: path.resolve(__dirname, 'src', 'pages'),
};

module.exports = (env, argv = {}) => {
  const { mode = 'development' } = argv;
  const pages = [];
  fs.readdirSync(nth.dir.pages).forEach((file) => {
    pages.push(file);
  });
  const htmlPlugins = pages.map((fileName) => {
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
      alwaysWriteToDisk: true,
      inject: true,
      hash: true,
      meta: {
        viewport: 'initial-scale=1.0, width=device-width',
        'msapplication-TileColor': '#da532c',
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
      })
    ];
    if (isProduction) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: '[name].css?version=[contenthash]',
          chunkFilename: '[id].css?version=[contenthash]',
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
    output: {
      filename: '[name].js?version=[hash]',
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
              name: '[name].[ext]?version=[contenthash]',
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
                name: '[name].[ext]?version=[contenthash]',
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
                name: '[name].[ext]?version=[contenthash]',
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
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
                prependData: '@import "theme/variables.scss";',
                sassOptions: {
                  includePaths: [path.join(__dirname, 'src')],
                  outputStyle: isDevelopment ? 'expanded' : 'compressed',
                },
              },
            },
          ],
          include: path.join(__dirname, 'src'),
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
