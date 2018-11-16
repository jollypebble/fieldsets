import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import { Input, ButtonRaised } from 'components';

const reduxFormConfig = {
  form: 'addExtraField',
  enableReinitialize: true,
};

class AddExtraField extends Component {

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  handleAddNew = (data) => {
    this.props.handleAddExtraField(data.extra_field);
    this.props.reset();
  }

  render() {
    const {
      handleSubmit,
      pristine
    } = this.props;
    return (
      <Row middle="xs">
        <Col xs={ 10 }>
          <Field
            name="extra_field"
            label="Add extra field"
            component={ Input }
          />
        </Col>
        <Col xs={ 2 }>
          <ButtonRaised
            primary
            btnText="Add new"
            disabled={ pristine }
            onClick={ handleSubmit(this.handleAddNew) }
          />
        </Col>
      </Row>
    );
  }
}

AddExtraField.propTypes = {
  handleAddExtraField: PropTypes.func,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
};

export default reduxForm(reduxFormConfig)(AddExtraField);
