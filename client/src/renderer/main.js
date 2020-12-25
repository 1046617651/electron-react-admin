import React from 'react'
import ReactDOM from 'react-dom'

// import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import store from './store'
import { history } from './history'
import App from './app'
function render (Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component/>
      </ConnectedRouter>
    </Provider>
    , document.getElementById('app')
  )
}
render(App)
