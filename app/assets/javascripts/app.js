
// These node libraries are set globally from the webpack bundle (entry.js) to be used in Rails
const applyMiddleware = window.BootstrapNodeToRails.redux.applyMiddleware;
const createStore = window.BootstrapNodeToRails.redux.createStore;
const cablecar = window.BootstrapNodeToRails.cablecar;

// Initial Store State
var initialState = {
  bgColor: 'lightblue',
  connected: false,
  players: [],
  myId: undefined
};

// Redux Reducer function
function reducer(state = initialState, action) {
  // Logger / Display Action & Payload
  console.log("Redux Action: ", action);
  var value = action.value ? JSON.stringify(action.value).split(',').join('<br>') : '';
  $(document).ready(function() { 
    $("#action").html('<h1>Action & Payload</h1><br><span>' + action.type + '</span><br><br>' + value); 
  });
  
  switch (action.type) {
    case 'CABLECAR_CONNECTED':
      return Object.assign({}, state, {
        connected: true
      });
    case 'CONNECTED_TO_GAME':
      return Object.assign({}, state, {
        myId: action.value
      })
    case 'ADD_PLAYER':
      return Object.assign({}, state, {
        players: state.players.slice().concat(action.value)
      });
    case 'CHANGE_BGCOLOR':
      return Object.assign({}, state, {
        bgColor: action.value
      });
    case 'UPDATE_PLAYER':
      let players = state.players.filter(function(item, index) { return item.id !== action.value.id; });
      players.push(action.value);
      return Object.assign({}, state, {
        players: players
      })
    case 'REMOVE_PLAYER':
      return Object.assign({}, state, {
        players: state.players.filter(function(item, index) { return item.id !== action.value; })
      })
    default:
      return state
  }
}

// Redux Store
var store = createStore(reducer, applyMiddleware(cablecar));

var options = {
  connected: function() {
    store.dispatch({ type: "CONNECT_TO_GAME" });
    store.dispatch({ type: "CHANGE_BG_COLOR "});
  },
  params: { game_id: 1 },
  prefix: '' // with a blank prefix all actions are dispatched to Rails
};

// *REQUIRED* connect cablecar to the store
var car = cablecar.connect(store, 'GameChannel', options);


// (In place of a front end framework)
// jQuery
$(function() {
  $("body").on("keydown", function(e) {
    switch(e.which) {
      case 37: // left
        store.dispatch({ type: "MOVE_LEFT" });
      break;

      case 38: // up
        store.dispatch({ type: "MOVE_UP" });
      break;

      case 39: // right
        store.dispatch({ type: "MOVE_RIGHT" });
      break;

      case 40: // down
        store.dispatch({ type: "MOVE_DOWN" });
      break;
        
      case 67: // c
        store.dispatch({ type: "CHANGE_BG_COLOR" });
      break;

      default: return; // exit this handler for other keys
    }
  });
  
  // Canvas logic
  var canvas = undefined;
  var ctx = undefined;
  
  $(document).ready(function() {
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
  });
  
  store.subscribe(function() {
    var connected = store.getState().connected;
    $("#state").html(connected ? 'Connected' : 'Connecting...');
    
    var color = store.getState().bgColor;
    $("body").css("background", color);
    
    var players = store.getState().players;

    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0,0,550,550);
      for (var i = 0; i < players.length; i++) {
        ctx.fillStyle = players[i].color;
        ctx.fillRect((players[i].position_x*50), (players[i].position_y*50), 50, 50);
      }
    }
    
  });
});