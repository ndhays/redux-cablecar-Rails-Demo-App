import React from 'react'
import { render } from 'react-dom'

import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import { createCableCar } from 'redux-cablecar'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import App from './components/app'

const cheapLogger = (store) => (next) => (incomingAction) => {
    console.log('REDUX ACTION:', incomingAction)
    next(incomingAction)
}

// Create Redux Store (attach cablecar)
const cableCar = createCableCar()
const cableCarMiddleware = cableCar.createMiddleware()
let store = createStore(
    reducers,
    applyMiddleware(cableCarMiddleware, cheapLogger)
)
cableCar.init(store, 'MainChannel', { permittedActions: '' })

// Attach App to Rails
window.ignite = function () {
    window.ReactStore = store

    render(
        <MuiThemeProvider>
            <Provider store={store}>
                <App cablecar={cableCar} />
            </Provider>
        </MuiThemeProvider>,
        document.getElementById('reactApp')
    )
}
