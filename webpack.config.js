var webpack = require('webpack');

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname + "/app/assets/javascripts",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /entry.js/, use: 'babel-loader'
            }
        ]
    }
}