"use strict";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlBeautifyPlugin = require("html-beautify-webpack-plugin");
const path = require("path");
const fs = require("fs");
const pug = require("pug");
const webpack = require("webpack");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
// const pretty = require("pretty");
// const getClassesFromHtml = require("get-classes-from-html");
const assert = require("assert");
const postcssSCSS = require("postcss-scss");
const stylelint = require("stylelint");
// const doiuse = require("doiuse");
const postcssReporter = require("postcss-reporter");

const nth = {};
//nth.config = require("./config.js");
//nth.blocksFromHtml = Object.create(nth.config.alwaysAddBlocks);
nth.dir = {
  src: path.resolve(__dirname, "src"),
  blocks: path.resolve(__dirname, "src", "blocks"),
  pages: path.resolve(__dirname, "src", "pages"),
};

module.exports = (env = {}) => {
  const { mode = "development" } = env;
  //const buildLibrary = env.BUILD_LIBRARY == "yes" ? true : false;

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

  // const blocksList = pages.map((fileName) => {
  //   try {
  //     const pathFile = `${nth.dir.pages}/${fileName}/${fileName}.pug`;
  //     if (fileExist(pathFile)) {
  //       const compiledFunction = pug.compileFile(pathFile);
  //       let html = compiledFunction({
  //         getData: () => {
  //           try {
  //             return JSON.parse(
  //               fs.readFileSync(
  //                 `${nth.dir.pages}/${fileName}/data.json`,
  //                 "utf8"
  //               )
  //             );
  //           } catch (e) {
  //             console.warn(`data.json was not provided for page ${fileName}`);
  //             return {};
  //           }
  //         },
  //       });
  //       html = pretty(html, { ocd: true });
  //       html = html.replace(
  //         /^(\s*)(<button.+?>)(.*)(<\/button>)/gm,
  //         "$1$2\n$1  $3\n$1$4"
  //       );
  //       html = html.replace(
  //         /^( *)(<.+?>)(<script>)([\s\S]*)(<\/script>)/gm,
  //         "$1$2\n$1$3\n$4\n$1$5\n"
  //       );
  //       html = html.replace(
  //         /^( *)(<.+?>)(<script\s+src.+>)(?:[\s\S]*)(<\/script>)/gm,
  //         "$1$2\n$1$3$4"
  //       );
  //       let classesInFile = getClassesFromHtml(html);
  //       // nth.blocksFromHtml = [];
  //       // Обойдём найденные классы
  //       for (let item of classesInFile) {
  //         // Не Блок или этот Блок уже присутствует?
  //         if (
  //           item.indexOf("__") > -1 ||
  //           item.indexOf("--") > -1 ||
  //           nth.blocksFromHtml.indexOf(item) + 1
  //         )
  //           continue;
  //         // Класс совпадает с классом-исключением из настроек?
  //         if (nth.config.ignoredBlocks.indexOf(item) + 1) continue;
  //         // У этого блока отсутствует папка?
  //         // if (!fileExist(dir.blocks + item)) continue;
  //         // Добавляем класс в список
  //         nth.blocksFromHtml.push(item);
  //       }
  //     }
  //     const newJsImportsList = [];
  //     let allBlocksWithJsFiles = [];
  //     try {
  //       allBlocksWithJsFiles = getDirectories("js");
  //     } catch (e) {
  //       $a = 1;
  //     }
  //     allBlocksWithJsFiles.forEach((blockWithJsFile) => {
  //       let url = `${nth.dir.blocks}/${blockWithJsFile}/${blockWithJsFile}.js`;
  //       if (nth.blocksFromHtml.indexOf(blockWithJsFile) === -1) return;
  //       if (newJsImportsList.indexOf(blockWithJsFile) > -1) return;
  //       newJsImportsList.push(url);
  //     });
  //     let jsRequires = fs.readFileSync(`${nth.dir.src}/entry.js`, "utf-8");
  //     newJsImportsList.forEach((src) => {
  //       jsRequires += `require('${src}');\n`;
  //     });
  //     jsRequires && fs.writeFileSync(`${nth.dir.src}/index.js`, jsRequires);
  //   } catch (e) {
  //     console.warn(`was not provided for page ${fileName}`);
  //   }
  // });

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
      // new HtmlWebpackPlugin({
      //   title: "Hello World",
      //   buildTime: new Date().toISOString(),
      //   template: "public/index.html",
      // }),
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
          //filename: "main-[hash:8].css",
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
    output: {
      filename: isProd ? "main-[hash:8].js" : undefined,
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
        // Loading images
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "./images/",
                publicPath: "./images",
                //name: "[path][name]-[sha1:hash:7].[ext]",
                name: "[sha1:hash:7]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },

        //Loading fonts
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

        // Loading CSS
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },

        // Loading SASS/SCSS
        {
          test: /\.(s[ca]ss)$/,
          use: [
            ...getStyleLoaders(),
            "resolve-url-loader",
            "sass-loader",
            // {
            //   loader: "postcss-loader",
            //   options: {
            //     syntax: postcssSCSS,
            //     plugins: function () {
            //       return [
            //         stylelint(),
            //         doiuse({
            //           browsers: ["ie >= 11", "last 2 versions"],
            //           ignore: [
            //             "flexbox",
            //             "rem",
            //             "css-resize",
            //             "css-masks",
            //             "object-fit",
            //           ],
            //           ignoreFiles: ["**/normalize.css"],
            //         }),
            //         postcssReporter({
            //           clearReportedMessages: true,
            //           throwError: true,
            //         }),
            //       ];
            //     },
            //   },
            // },
          ],
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
      open: true,
      //contentBase: path.join(__dirname, "dist"),
    },
  };
};

/**
 * Проверка существования файла или папки
 * @param  {string} path      Путь до файла или папки
 * @return {boolean}
 */
function fileExist(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

/**
 * Получение всех названий поддиректорий, содержащих файл указанного расширения, совпадающий по имени с поддиректорией
 * @param  {string} ext    Расширение файлов, которое проверяется
 * @return {array}         Массив из имён блоков
 */
function getDirectories(ext) {
  const source = `${nth.dir.blocks}/`;
  let res = fs
    .readdirSync(source)
    .filter((item) => fs.lstatSync(source + item).isDirectory())
    .filter((item) => fileExist(source + item + "/" + item + "." + ext));
  return res;
}

/**
 * Получение разницы между двумя массивами.
 * @param  {array} a1 Первый массив
 * @param  {array} a2 Второй массив
 * @return {array}    Элементы, которые отличаются
 */
function getArraysDiff(a1, a2) {
  return a1
    .filter((i) => !a2.includes(i))
    .concat(a2.filter((i) => !a1.includes(i)));
}
