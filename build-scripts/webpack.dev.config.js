const path = require("path");
const { merge } = require("webpack-merge");
const { getEntries } = require("./helpers");
const base = require("./webpack.base.config");

const configuration = {
    entry: merge(
      // getEntries("./src/MainProcess/*.js", 'main/'),
      getEntries("./src/Renderer/*.js", 'renderer/'),
      // getEntries()
    ),
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../dist")
    }
};

module.exports = env => { 
  return merge(base(env), configuration) 
};