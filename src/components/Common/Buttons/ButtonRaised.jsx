import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

const ButtonRaised = ({
  btnText,
  onClick,
  primary = false,
  secondary = false,
  disabled = false,
  fullWidth = false,
  style = {}
}) => (
  <RaisedButton
    label={ btnText }
    style={ style }
    onClick={ onClick }
    primary={ primary }
    secondary={ secondary }
    fullWidth={ fullWidth }
    disabled={ disabled }
  />
);

ButtonRaised.propTypes = {
  btnText: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  style: PropTypes.object,
};

export default ButtonRaised;
