
// Initial Store State
var initialState = {
  connected: false,
  msgs: []
};

// Redux Reducer function
export default function reducer(state = initialState, action) {

  switch (action.type) {
    case 'CABLECAR_CONNECTED':
      return Object.assign({}, state, {
        connected: true
      });

    case 'CABLECAR_DISCONNECTED':
      return Object.assign({}, state, {
        connected: false
      });

    case 'NEW_MSG':
      let msgs = state.msgs.slice(-30); // max 31 on client side
      msgs.push({ name: action.name, msg: action.msg, time: action.time });
      return Object.assign({}, state, {
        msgs
      });

    case 'RECENT_MSGS':
      return Object.assign({}, state, {
        msgs: action.msgs
      });

    default:
      return state
  }
}
