const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname,
    filename: 'bundle.server.js'
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /.js/,
        loader: 'babel-loader'
      }
    ]
  }
};
