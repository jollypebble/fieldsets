import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  onClick
}) => (
  <button
    className="custom_button"
    onClick={ onClick }
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
