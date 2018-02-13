const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");
const Merge = require("webpack-merge");

const Common = require("./webpack.common.js");

const ScalaJs = Merge(Common.ScalaJs, {
  output: {
    publicPath: "/"
  }
});

console.log(__dirname);
console.log(Common.rootDir);

const Web = Merge(Common.Web, {
  output: {
    path: __dirname,
    publicPath: "/"
  },
  entry: {
    app: Path.resolve(Common.resourcesDir, "./dev.js")
  },
  module: {
    noParse: function(content) {
      return content.endsWith("-fastopt");
    },
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: [__dirname, Common.rootDir]
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["app"],
      template: Path.resolve(Common.resourcesDir, "./index.html"),
      favicon: Path.resolve(Common.resourcesDir, "./images/favicon.ico")
    })
  ]
});

module.exports = Merge(ScalaJs, Web);
