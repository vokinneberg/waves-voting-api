import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

class Home extends React.Component {
  render() {
    return (
      <div className="k-grid__item k-grid__item--fluid k-grid k-grid--ver k-grid--stretch">
        <div className="k-container k-content-wrapper  k-grid k-grid--ver" id="k_content_wrapper">
          <div className="k-content	k-grid__item k-grid__item--fluid k-grid k-grid--hor" id="k_content">
          Home
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { push })(Home);
