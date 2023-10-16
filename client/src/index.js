import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './store';
import App from './App';
import browserHistory from './browserHistory';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
