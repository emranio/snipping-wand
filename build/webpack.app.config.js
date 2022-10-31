const path = require("path");
const { merge } = require("webpack-merge");
const base = require("./webpack.base.config");

module.exports = env => {
  return merge(base(env), {
    entry: {
      main: "./src/Electron/Main.js",
      preload: "./src/Electron/Preload.js",

      // mainwindow: "./src/Renderer/Main.js",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist")
    }
  });
};
