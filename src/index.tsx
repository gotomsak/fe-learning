import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import LearningPage from './pages/LearningPage'
import App from './App'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createStore from './store';

const history = createBrowserHistory();
const store = createStore(history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
    {/* <LearningPage /> */}
    
  </React.StrictMode>,
  document.getElementById('root')
);
export default store
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
