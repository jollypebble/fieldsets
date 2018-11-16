import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import { Input, ButtonIcon } from 'components';
import { AddExtraField } from './Partials';

const customContentStyle = {
  borderRadius: '10px'
};

const reduxFormConfig = {
  // form: 'circleModalForm',
  enableReinitialize: true,
};

class CircleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleToggle = () => {
    this.props.reset();
    this.props.handleToggle();
  };

  handleAddExtraField = (value) => {
    this.props.handleAddExtraField(value);
  }

  handleRemoveExtraField = (e) => {
    this.props.handleRemoveExtraField(e.target.id);
  }

  handleSave = (data) => {
    this.props.handleSave(data);
    this.handleToggle();
  }

  render() {
    const {
      visible,
      title,
      circleData,
      handleSubmit
    } = this.props;
    const actions = [
      <FlatButton
        key={ 1 }
        label="Cancel"
        secondary
        onClick={ this.handleToggle }
      />,
      <FlatButton
        key={ 2 }
        label="Save"
        primary
        onClick={ handleSubmit(this.handleSave) }
      />
    ];

    return (
      <div className="modalwindow">
        <Dialog
          title={ title }
          actions={ actions }
          modal={ false }
          open={ visible }
          onRequestClose={ this.handleToggle }
          style={ customContentStyle }
          autoScrollBodyContent
          paperProps={ {
            style: customContentStyle
          } }
        >
          <div>
            <form>
              {circleData.map(item => (
                <div key={ item.key }>
                  {!item.hasExtraFields &&
                    <Field
                      name={ item.key }
                      label={ item.label }
                      component={ Input }
                    />
                  }
                  {item.hasExtraFields && item.extra_fields.map(extraField => (
                    <Row key={ extraField.key } middle="xs">
                      <Col xs={ 10 }>
                        <Field
                          name={ extraField.key }
                          label={ extraField.label }
                          component={ Input }
                        />
                      </Col>
                      <Col xs={ 2 }>
                        <ButtonIcon
                          id={ extraField.key }
                          onClick={ this.handleRemoveExtraField }
                          icon="clear"
                        />
                      </Col>
                    </Row>
                  ))
                  }
                  {item.hasExtraFields &&
                    <AddExtraField
                      handleAddExtraField={ this.handleAddExtraField }
                    />
                  }
                </div>
              ))}
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

CircleModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  circleData: PropTypes.array,
  handleToggle: PropTypes.func,
  handleAddExtraField: PropTypes.func,
  handleRemoveExtraField: PropTypes.func,
  handleSave: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
};

export default reduxForm(reduxFormConfig)(CircleModal);
