"use strict";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const nth = {};
nth.dir = {
  src: path.resolve(__dirname, "src"),
  blocks: path.resolve(__dirname, "src", "blocks"),
  pages: path.resolve(__dirname, "src", "pages"),
};

module.exports = (env = {}) => {
  const { mode = "development" } = env;
  const pages = [];
  fs.readdirSync(nth.dir.pages).forEach((file) => {
    pages.push(file);
  });
  const htmlPlugins = pages.map(
    (fileName) =>
      new HtmlWebpackPlugin({
        getData: () => {
          try {
            return JSON.parse(
              fs.readFileSync(`${nth.dir.pages}/${fileName}/data.json`, "utf8")
            );
          } catch (e) {
            console.warn(`data.json was not provided for page ${fileName}`);
            return {};
          }
        },
        filename: `${fileName}.html`,
        template: `${nth.dir.pages}/${fileName}/${fileName}.pug`,
        chuncks: [fileName],
        alwaysWriteToDisk: true,
        inject: true,
        hash: true,
      })
  );

  const isProd = mode === "production";
  const isDev = mode === "development";

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      }),
      new FaviconsWebpackPlugin({
        logo: "./src/theme/favicon.png",
        publicPath: "./",
      }),
      ...htmlPlugins,
      new webpack.HotModuleReplacementPlugin(),
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css",
          hmr: isDev,
          reloadAll: true,
        })
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? "production" : isDev && "development",
    devtool: isDev ? "eval" : undefined,
    output: {
      filename: isProd ? "main-[hash:8].js" : undefined,
      pathinfo: isDev,
    },
    resolve: {
      modules: ["src", "node_modules"],
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: "pug-loader",
              options: {
                pretty: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "./images/",
                publicPath: "./images",
                name: "[sha1:hash:7]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]",
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
          use: [...getStyleLoaders(), "resolve-url-loader", "sass-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },

    plugins: getPlugins(),

    devServer: {
      inline: true,
      hot: true,
      contentBase: "dist",
      host: "0.0.0.0",
    },
  };
};
