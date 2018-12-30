import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Route, Switch } from 'react-router';

import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';

import { store } from '../../store';
import agent from '../../agent';
import Header from './Header';
import Footer from './Footer';
import CreateProject from './CreateProject';
import Project from './Project';
import Home from './Home';
import NotFound from '../NotFound';

import '../../assets/css/style.css';

const mapStateToProps = state => ({
  appLoaded: state.appLoaded,
  currentUser: state.currentUser,
  redirectTo: state.redirectTo,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOAD, payload, token, skipTracking: true,
  }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

class Dashboard extends React.PureComponent {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/dashboard" component={Home} />
          <Route path="/dashboard/create-project" component={CreateProject} />
          <Route path="/dashboard/project/:id" component={Project} />
          <Route path="/dashboard/*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
