/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class SecondaryButton extends React.PureComponent {
  render() {
    const { text, onClick } = this.props;
    return (
      <button type="button" className="btn btn-secondary" onClick={onClick}>{text}</button>
    );
  }
}

export default SecondaryButton;
