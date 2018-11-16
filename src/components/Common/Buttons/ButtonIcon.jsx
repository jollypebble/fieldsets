import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

const ButtonIcon = ({
  onClick,
  disabled = false,
  style = {},
  icon,
  id
}) => (
  <IconButton
    id={ id }
    style={ style }
    onClick={ onClick }
    disabled={ disabled }
  >
    <FontIcon id={ id } className="material-icons">{icon}</FontIcon>
  </IconButton>
);

ButtonIcon.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  icon: PropTypes.string,
  id: PropTypes.string,
};

export default ButtonIcon;
