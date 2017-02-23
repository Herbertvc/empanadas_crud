import Inferno from 'inferno';
import Component from 'inferno-component';
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'inferno-redux';
import { createStore } from 'redux';

import App from './js/App/App';
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
})

class BasicComponent1 extends Component {
    render() {
        const store = this.context.store;
        const state = store.getState();

        const onClick = e => {
            e.preventDefault();
            store.dispatch({
                type: 'CHANGE_NAME',
                name: 'Jerry'
            });
        };

        return (
            <div className="basic">
                <a id="dispatch" onClick={ onClick }>
                    <span>Hello { state.name || 'Tom' }</span>
                </a>
            </div>
        );
    }
}

class BasicComponent2 extends Component {
    render() {
        const store = this.context.store;
        const state = store.getState();

        return (
            <div className="basic2">
                { state.name === 'Jerry' ? 'You\'re a mouse!' : 'You\'re a cat!' }
            </div>
        );
    }
}


Inferno.render((
  <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route  component={ App }>
          <Route path="/" component={ BasicComponent1 } />
          <Route path="/next" component={ BasicComponent2 } />
        </Route>
      </Router>
  </Provider>
  ),document.getElementById('app')
);
