import React from 'react'

import { applyMiddleware, createStore } from 'redux'
import reducers from '../lib/reducers'
import { createCableCarRoute } from 'redux-cablecar'

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import ChatRoom from './chatRoom'

const cheapLogger = (store) => (next) => (incomingAction) => {
    console.log('REDUX ACTION:', incomingAction)
    next(incomingAction)
}

// **** Create Cable Car Route **** //
const cableCarRoute = createCableCarRoute()
const cableCarMiddleware = cableCarRoute.createMiddleware()

let store = createStore(
    reducers,
    applyMiddleware(cableCarMiddleware, cheapLogger)
)

// CONNECT MAIN CHANNEL
const mainChannelCar = cableCarRoute.connect(store, 'MainChannel', {
    permittedActions: '',
})

// CONNECT OTHER CHANNEL
cableCarRoute.connect(store, 'OtherChannel', {
    permittedActions: 'OTHER',
})

const theme = createMuiTheme()
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <ChatRoom cablecar={mainChannelCar} />
            </Provider>
        </ThemeProvider>
    )
}