import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/reducers'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd-mobile'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)
ReactDOM.render(
  <LocaleProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
