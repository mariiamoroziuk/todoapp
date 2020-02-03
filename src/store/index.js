import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

export function configureStore(initState) {
    const logger = createLogger();
    return createStore(
        rootReducer,
        initState,
        composeWithDevTools(applyMiddleware(logger, thunk))
    )
}