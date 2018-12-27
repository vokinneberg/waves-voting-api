/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Submit extends React.PureComponent {
  render() {
    const { text } = this.props;
    return (
      <button type="submit" className="btn btn-success">{text}</button>
    );
  }
}

export default Submit;
