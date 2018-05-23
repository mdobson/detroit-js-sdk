const webpack = require("webpack");
const nodeEnv = process.env.NODE_ENV || "production";

module.exports = {
  devtool: "source-map",
  entry: {
    filename: "./src/DetroitApiClient.js"
  },
  output: {
    path: __dirname + "/build",
    filename: "DetroitApiClient.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env"]
        }
      }
    ]
  }
};
