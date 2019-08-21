import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import subAdminDetailsReducer from '../redux/reducers/SubAdminDetail/SubAdminDetail'

const reducer = combineReducers({
    reducers,
    subAdminDetailsReducer
})
const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
)

export default store
