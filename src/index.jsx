import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { store, history } from './store';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </Provider>
),
// eslint-disable-next-line no-undef
document.getElementById('root'));
