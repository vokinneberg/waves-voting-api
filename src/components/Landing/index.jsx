import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import LogIn from './LogIn';

class Landing extends React.Component {
  render() {
    return (
      <LogIn />
    );
  }
}

export default connect(null, { push })(Landing);
