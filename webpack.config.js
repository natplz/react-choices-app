//This is actually a NodeJS file!
//That's why there are some unfamiliar objects/functions in here....


//Input file path is relative
//Output file path is absolute
const path = require("path");
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename:"bundle.js"
  },

  //Run this loader every time we come across a JS file
  //In our case, we want to run Babel over every JS file, except the stuff in node_modules directory, because those are third-party imports already transpiled down to ES5
  module: {
    //Rules array of objects
    rules: [

    //Rule for treating JS like JSX
    {
      loader: "babel-loader",
      test: /\.js$/, //Regex to identify all .js files
      exclude: /node_modules/
    }, 

    //Rule for CSS
    {
      test: /\.s?css$/,

      //"use" allows us to specify an array of loaders
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  //This sets up 'source maps' to aid in debugging
  devtool: 'cheap-module-eval-source-map',

  //Sets up devServer
  //Only argument needed is contentBase, which specifies the material our server needs to run
  devServer: {
    contentBase: path.join(__dirname, "public")
  }
};