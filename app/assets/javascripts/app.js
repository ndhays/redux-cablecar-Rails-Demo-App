
const applyMiddleware = window.BootstrapNodeToRails.redux.applyMiddleware;
const createStore = window.BootstrapNodeToRails.redux.createStore;
const cablecar = window.BootstrapNodeToRails.cablecar;

var initialState = {
  colors: [],
  connected: false,
  currentColor: '',
  msg: ''
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CABLECAR_CONNECTED':
      return Object.assign({}, state, {
        connected: true
      });
    case 'CHANGE_MSG':
      return Object.assign({}, state, {
        msg: action.value
      });
    case 'ACTIVATE_COLOR':
      return Object.assign({}, state, {
        currentColor: action.value
      })
    case 'NEW_COLORS':
      return Object.assign({}, state, {
        colors: action.value
      })
    default:
      return state
  }
}

var store = createStore(reducer, applyMiddleware(cablecar));

var options = {
  connected: function() {
    store.dispatch({ type: "GET_MSG" });
    store.dispatch({ type: "GET_COLOR" });
  },
  prefix: '' 
};

var car = cablecar.connect(store, 'ChatChannel', options);


// jQuery state->UI (full front end framework...)
$(function() {
  $("#message").on("keyup", function() {
    store.dispatch({ type: "CHANGE_MSG", value: $(this).val() });
  });
  $("body").on("click", ".color", function(e) {
    store.dispatch({  type: "SELECT_COLOR", id: $(this).data('id') });
  });
  $("#mix").on("click", function() {
    store.dispatch({ type: "CHANGE_COLORS" });
  })
  
  store.subscribe(function() {
    var connected = store.getState().connected;
    $("#state").html(connected ? 'Connected' : 'Connecting...');
    
    var msg = store.getState().msg;
    $("#msg").html(msg);
    $("#message").val(msg);
    
    var color = store.getState().currentColor;
    $("body").css("background", color);
    
    var colors = store.getState().colors;
    $(".colors").html(colors.map(function(c) {
      return '<div data-id="' + c[0] + '" class="color ' + c[1] + '" style="background: ' + c[2] + '"></div>';
    }));
  });
});