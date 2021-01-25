// Initial Store State
var initialState = {
    connected: false,
    msgs: [],
}

// Redux Reducer function
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'redux-cablecar/CONNECTED':
            return Object.assign({}, state, {
                connected: true,
            })

        case 'redux-cablecar/DISCONNECTED':
            return Object.assign({}, state, {
                connected: false,
            })

        case 'NEW_MSG':
        case 'redux-cablecar/NEW_MSG':
            let msgs = state.msgs.slice(-30) // max 31 on client side
            let payload = action.payload
            msgs.push({
                name: payload.name,
                msg: payload.msg,
                time: payload.time,
            })
            return Object.assign({}, state, {
                msgs,
            })

        case 'RECENT_MSGS':
            return Object.assign({}, state, {
                msgs: action.payload.msgs,
            })

        default:
            return state
    }
}
