module.exports = {
    entry: './source/jsx/index.jsx',
    output: {
      filename: './www/js/bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader' },
        { test: /\.jsx$/, loader: 'babel-loader' }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
};
