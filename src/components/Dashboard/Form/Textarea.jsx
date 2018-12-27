/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Textarea extends React.PureComponent {
  render() {
    const {
      id,
      text,
      value,
      rows,
      helperText,
      lastControl,
      onChange,
    } = this.props;

    let helperSpan = <span className="form-text text-muted" />;
    if (helperText) {
      helperSpan = <span className="form-text text-muted">{helperText}</span>;
    }

    let controlClass = "form-group";
    if (lastControl) {
      controlClass += " form-group-last";
    }

    return (
      <div className={controlClass}>
        <label htmlFor={id}>{text}:</label>
        <textarea className="form-control" id={id} rows={rows} onChange={onChange} />
        {helperSpan}
      </div>
    );
  }
}

export default Textarea;
