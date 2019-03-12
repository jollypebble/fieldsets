import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
  borderRadius: '10px'
};
/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  /**
   * This toggles the visibility of the drawer
   */
  handleToggle = () => {
    this.props.handleToggle();
    // this.setState({open: !this.state.open});
  };

  render() {
    const {
      visible
    } = this.props;
    const actions = [
      <FlatButton
        key={ 1 }
        label="Ok"
        primary
        keyboardFocused
        onClick={ this.handleToggle }
      />,
    ];

    return (
      <div className="modalwindow">
        {/* <RaisedButton
          label="View Circle"
          labelPosition="before"
          onClick={this.handleToggle}
          className="modalbutton"
          buttonStyle={{cursor: 'context-menu'}}
        /> */}
        <Dialog
          title="Circle Sheet Editor"
          actions={ actions }
          modal={ false }
          open={ visible }
          onRequestClose={ this.handleToggle }
          style={ customContentStyle }
          className="modalbox"
          paperProps={ {
            style: customContentStyle
          } }
        />
      </div>
    );
  }
}

Modal.propTypes = {
  handleToggle: PropTypes.func,
  visible: PropTypes.bool,
};
