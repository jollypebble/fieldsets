import React from 'react';
import { TextField, Fab, Divider, Button } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const ClientData = {
  accountName: { value: 'Willg' },
  clientName1: { value: 'Nimit' },
  clientName2: { value: 'Rahul' },
  dependentName0: { value: 'Econ Circle' },
  cpaName: { value: 'Econ' },
  attyName: { value: 'Econ Circles' },
  ip: { value: '12345' }
};

export default class ClientSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: ClientData,
      validate: [],
      repeaterFields: [],
    };
  }

  /**
   * Handle form elements's values change
   * @param {*} event
   */
  handleValueChange = (event) => {
    const { formValues } = this.state;
    formValues[event.target.name] = { value: event.target.value, valid: true };
    this.setState({
      formValues
    }, () => {
      console.log(this.state.formValues);
    });
  }

  /**
   * Check field validation on Blur
   * @param {*} arg
   */
  isValidate(arg) {
    const { validate } = this.state;
    validate[arg] = !this.state.formValues[arg];
    this.setState({ validate }, () => { });
  }

  addNewField() {
    const { repeaterFields } = this.state;
    repeaterFields.push(<TextField
      hintText={ `Dependent Name ${repeaterFields.length + 1}` }
      name={ `dependentName${repeaterFields.length + 1}` }
      onChange={ (e) => { this.handleValueChange(e); } }
    />);
    this.setState({ repeaterFields }, () => { });
  }

  removeField(index) {
    this.state.repeaterFields.splice(parseInt(index, 10), 1);
    const { formValues } = this.state;
    delete formValues[`dependentName${parseInt(index + 1, 10)}`];
    this.setState({ repeaterFields: this.state.repeaterFields }, () => { });
  }

  formSubmit() {
    alert(JSON.stringify(this.state.formValues));
  }

  render() {
    return (
      <div className="drawer-sheet clientSheetContainer">
        <div className="form-group">
          <TextField
            hintText="Account Name"
            floatingLabelText="Account Name"
            name="accountName"
            errorText={ this.state.validate.accountName === false && this.state.formValues.accountName.value === '' ? 'Account Name is required' : false }
            onChange={ (e) => { this.handleValueChange(e); } }
            onBlur={ () => this.isValidate('accountName') }
            value={ this.state.formValues.accountName.value }
          />
        </div>

        <div className="form-group">
          <TextField
            hintText="Client Name 1"
            floatingLabelText="Client Name 1"
            name="clientName1"
            errorText={ this.state.validate.clientName1 === false && this.state.formValues.clientName1.value === '' ? 'Client Name 1 is required' : false }
            onChange={ (e) => { this.handleValueChange(e); } }
            onBlur={ () => this.isValidate('clientName1') }
            value={ this.state.formValues.clientName1.value }
          />
        </div>

        <div className="form-group">
          <TextField
            hintText="Client Name 2"
            floatingLabelText="Client Name 2"
            name="clientName2"
            errorText={ this.state.validate.clientName2 === false && this.state.formValues.clientName2.value === '' ? 'Client Name 2 is required' : false }
            onChange={ (e) => { this.handleValueChange(e); } }
            onBlur={ () => this.isValidate('clientName2') }
            value={ this.state.formValues.clientName2.value }
          />
        </div>

        <div className="form-group">
          <TextField
            hintText="Dependent Name"
            floatingLabelText="Dependent Name"
            name="dependentName0"
            onChange={ (e) => { this.handleValueChange(e); } }
            value={ this.state.formValues.dependentName0.value }
          />

          <Fab mini className="addFieldBtn" onClick={ () => this.addNewField('dependentName') }>
            <Add />
          </Fab>
        </div>

        {
          this.state.repeaterFields.map((item, i) => (
            <div className="form-group" key={ i }>
              {item}
              <Fab className="removeFieldBtn" mini secondary onClick={ () => this.removeField(i) }>
                <Remove />
              </Fab>
            </div>
          ))
        }

        <div className="form-group">
          <Divider />
        </div>
        <div className="form-group">
          <TextField
            hintText="CPA Name"
            floatingLabelText="CPA Name"
            name="cpaName"
            errorText={ this.state.validate.cpaName === false && this.state.formValues.cpaName.value === '' ? 'CPA Name is required' : false }
            onChange={ (e) => { this.handleValueChange(e); } }
            onBlur={ () => this.isValidate('cpaName') }
            value={ this.state.formValues.cpaName.value }
          />
        </div>

        <div className="form-group">
          <TextField
            hintText="ATTY Name"
            floatingLabelText="ATTY Name"
            name="attyName"
            errorText={ this.state.validate.attyName === false && this.state.formValues.attyName.value === '' ? 'ATTY Name is required' : false }
            onChange={ (e) => { this.handleValueChange(e); } }
            onBlur={ () => this.isValidate('attyName') }
            value={ this.state.formValues.attyName.value }
          />
        </div>

        <div className="form-group">
          <TextField
            hintText="IP"
            floatingLabelText="IP"
            name="ip"
            errorText={ this.state.validate.ip === false && this.state.formValues.ip.value === '' ? 'IP is required' : false }
            onChange={ (e) => { this.handleValueChange(e); } }
            onBlur={ () => this.isValidate('ip') }
            value={ this.state.formValues.ip.value }
          />
        </div>
        <div className="form-group">
          <Button label="Submit" primary onClick={ () => this.formSubmit() } />
        </div>
      </div>
    );
  }
}
