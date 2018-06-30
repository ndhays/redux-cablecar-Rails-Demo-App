# Redux-Cablecar Rails App Demo
This app is a basic demo of [redux-cablecar](https://github.com/ndhays/redux-cablecar).  

It uses Webpack to build `bundle.js` and bootstrap node modules into the asset pipeline.  

(Webpack enters at `entry.js` and builds to -> `/app/assets/javascripts/bundle.js`)  

See `webpack.config.js` for more details  

## Setup

- `bundle install`  
- `rails db:create db:migrate`  
- `yarn`  
- `webpack`  

## Run
`rails s`

## Development
`webpack --watch`  
  
MIT
