import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const Input = ({
  input,
  // meta: { touched, error, warning },
  style = {},
  disabled = false,
  label
}) => (
  <div>
    <TextField
      fullWidth
      style={ style }
      floatingLabelText={ label }
      { ...input }
      disabled={ disabled }
    />
    {/* {touched && ((error && <span className="validation_error">{error}</span>) || (warning && <span>{warning}</span>))} */}
  </div>
);

Input.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

export default Input;
