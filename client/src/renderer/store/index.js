import rootReducers from './root_reducer'
// import uploadReducers from '../component/upload/reducer'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { history as initHistory } from '../history'
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const createRootReducer = (history, reducerObj) => combineReducers({
  router: connectRouter(history),
  ...reducerObj
})
const store = createStore(
  createRootReducer(initHistory, rootReducers),
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(initHistory)))
)

export default store
