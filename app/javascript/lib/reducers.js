// Initial Store State
var initialState = {
    connected: {
        MainChannel: false,
        OtherChannel: false,
    },
    msgs: [],
}

// Redux Reducer function
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'redux-cablecar/DISCONNECTED':
        case 'redux-cablecar/CONNECTED':
            return {
                ...state,
                connected: {
                    ...state.connected,
                    [action.meta.channel]:
                        action.type == 'redux-cablecar/CONNECTED',
                },
            }

        case 'NEW_MSG':
        case 'redux-cablecar/NEW_MSG':
            let msgs = state.msgs.slice(-30) // max 31 on client side
            let payload = action.payload
            msgs.push({
                name: payload.name,
                msg: payload.msg,
                time: payload.time,
            })
            return {
                ...state,
                msgs
            }

        case 'RECENT_MSGS':
            return {
                ...state,
                msgs: action.payload.msgs,
            }

        default:
            return state
    }
}
