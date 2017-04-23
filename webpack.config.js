var config = {
  entry: [
    './common-ui/app.jsx'
  ],

   output: {
      path:'./',
      filename: '/common-ui/bundle.js',
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }

         },
         { test: /\.css$/, loader: "style-loader!css-loader" }
      ]
   }
}

module.exports = config;
