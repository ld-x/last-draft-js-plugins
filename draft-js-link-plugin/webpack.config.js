/* for extracting and copying css module prefixed styles only... */

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    styles: './src/styles.css'
  },
  output: { filename: './lib/bundle-[name].js' },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ { loader: 'babel-loader', options: { presets: ['es2015', 'react', 'stage-0'] } } ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?modules&importLoaders=1&localIdentName=draftJsLinkPlugin__[local]__[hash:base64:5]!postcss-loader' })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("./lib/[name].css"),
  ]
}
