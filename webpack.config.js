module.exports = {
    entry: './source/jsx/main.jsx',
    output: {
      filename: './www/js/bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader' }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
};
