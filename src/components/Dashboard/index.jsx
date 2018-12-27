import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Route, Switch } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import CreateProject from './CreateProject';
import Home from './Home';
import NotFound from '../NotFound';

import '../../assets/css/style.css';

class Dashboard extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/dashboard" component={Home} />
          <Route path="/dashboard/create-project" component={CreateProject} />
          <Route path="/dashboard/*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { push })(Dashboard);
