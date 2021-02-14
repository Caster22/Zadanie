module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './app.js',
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      }
    ]
  },
  output: {
    filename: 'app.js',
  },
  devServer: {
    hot: true,
  },
};
