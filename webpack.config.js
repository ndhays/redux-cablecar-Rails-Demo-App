var webpack = require('webpack');

module.exports = {
    entry: __dirname + "/app/assets/javascripts/reactApp/entry.js",
    output: {
        path: __dirname + "/app/assets/javascripts",
        filename: "appBundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|cablecar.js)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            }
        ]
    }
}
