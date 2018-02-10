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

const Web = Merge(Common.Web, {
  output: {
    publicPath: "/"
  },
  entry: {
    app: Path.resolve(Common.resourcesDir, "./dev.js")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: [__dirname, Common.rootDir]
    // watchContentBase: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["app"],
      template: Path.resolve(Common.resourcesDir, "./index.html"),
      favicon: Path.resolve(Common.resourcesDir, "./images/favicon.ico")
    })
  ]
});

module.exports = Merge(ScalaJs, Web);