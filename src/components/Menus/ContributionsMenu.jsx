import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Drawer, Button, TextField } from 'react-md';
import { Row, Col } from 'react-flexbox-grid';

export default class ContributionsMenu extends DrawerMenu {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      position: 'left'
    };
  }

  render() {
    const actions = [
      <Button
        label="Cancel"
        primary
        onClick={ this.toggleVisibility }
        key="sidbarDrawerCancelButton"
      />,
      <Button
        label="Submit"
        primary
        keyboardFocused
        onClick={ this.toggleVisibility }
        key="sidbarDrawerSubmitButton"
      />,
    ];
    return (
      <React.Fragment>
        <Dialog
          title="Scrollable Dialog"
          actions={ actions }
          modal={ false }
          open={ this.state.open }
          onRequestClose={ this.handleClose }
          autoScrollBodyContent
        >
          <div>
            <form>
              <Row middle="xs">
                <Col xs={ 12 }>
                  <TextField
                    type="number"
                    name="Monthly Contribution"
                    label="Monthly Contribution"
                    // component={Input}
                    onChange={ this.handleValueChange }
                    value={ this.state.totalcontributionsAmount }
                  />
                  <TextField
                    type="number"
                    name="Lump Sums"
                    label="Lump Sums"
                    // component={Input}
                    onChange={ this.handleValueChange }
                    value={ this.state.totalcontributionsAmount }
                  />
                </Col>
              </Row>
            </form>
          </div>
        </Dialog>
        <Button icon>people_outline</Button>
      </React.Fragment>
    );
  }
}

ContributionsMenu.propTypes = {

};
