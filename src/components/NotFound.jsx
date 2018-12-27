import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

class NotFound extends React.Component {
  render() {
    return (
      <div>404 Not found</div>
    );
  }
}

export default connect(null, { push })(NotFound);
