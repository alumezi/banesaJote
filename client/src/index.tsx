import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import { App } from './containers/App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';

const middleware = [thunk];
let middlewares = applyMiddleware(...middleware);
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger() as any);
  middlewares = composeWithDevTools(middlewares);
}

const store = createStore(reducer, middlewares);

render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
