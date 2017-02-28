import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'inferno-redux';
import { createStore } from 'redux';

import App from './js/App/App.jsx';

import { Home, Login } from './js/pages';

import './css/index.css';

const browserHistory = createBrowserHistory();

const store = createStore(function(state, action) {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        name: action.name
      }
    default:
      return {
        name: 'TOM'
      };
  }
});

const authorizedOnly = ({props, router}) => {
  if (!props.loggedIn) {
    router.push('/login');
  }
}

Inferno.render((
  <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route  component={ App }>
          <IndexRoute component={ Home } onEnter={ authorizedOnly }  loggedIn={ true } />
          <Route path="/login" component={ Login } />
        </Route>
      </Router>
  </Provider>
  ),document.getElementById('app')
);
