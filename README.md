# Redux-Cablecar Rails App Demo
This app is a basic demo of [redux-cablecar](https://github.com/ndhays/redux-cablecar).  
  
It uses Webpack to build `bundle.js` and bootstrap node modules into the asset pipeline.  
  
(Webpack enters at `entry.js` and builds to -> `/app/assets/javascripts/bundle.js`) - see `webpack.config.js`  
  
## Demo
Use arrow keys to move square around the board.  
Press 'c' to change the background color.  
Open multiple incognito windows to see shared values.  
  
## Setup
`bundle install`  
`rails db:create db:migrate`  
`npm install`  
`webpack`  

## Run
`rails s`
