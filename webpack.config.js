const webpack = require("webpack");
const nodeEnv = process.env.NODE_ENV || "production";

module.exports = {
  mode: "development",
  devtool: "source-map",

  entry: {
    filename: "./src/index.js"
  },
  output: {
    path: __dirname + "/build",
    filename: "bundle.js",
    library: "DetroitApiClient"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
