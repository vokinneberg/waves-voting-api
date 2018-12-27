/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class LargeInput extends React.PureComponent {
  render() {
    const {
      id,
      text,
      value,
      type,
      helperText,
      onChange,
    } = this.props;

    let helperSpan = <span className="form-text text-muted" />;
    if (helperText) {
      helperSpan = <span className="form-text text-muted">{helperText}</span>;
    }

    return (
      <div className="form-group">
        <label htmlFor={id}>{text}:</label>
        <input type={type} className="form-control form-control-lg" placeholder={text} id={id} value={value} onChange={onChange} />
        {helperSpan}
      </div>
    );
  }
}

export default LargeInput;
