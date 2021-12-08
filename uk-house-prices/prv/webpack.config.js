const { join } = require('path');

module.exports = {
  entry: './index.ts',
  output: { filename: 'bundle.js', path: join(__dirname, '/../') },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
