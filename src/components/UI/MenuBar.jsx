import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Button, TextField } from 'react-md';
import { MenuDrawer } from '../../components/UI/Drawers';

export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyValue: '$25,490',
      editingField: null /* It has a string if some of the field are beign edited. If null - nothing is being edited. Values: 'monthly', null */
    };

    /** Here we store a value that was before we start editing a text field. We need it to get the value back when press Esc after editing */
    this.prevTextFieldValue = ''

    this.onMonthlyClick = this.onMonthlyClick.bind(this)
    this.onFieldChanged = this.onFieldChanged.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.setNullEditing = this.setNullEditing.bind(this)
  }

  componentDidMount(){
    document.addEventListener('keydown', this.onKeyPress, false);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onKeyPress, false);
  }

  onKeyPress(e) {
    if (!this.state.editingField) return
    // When we press Enter we want to save a result and remove focus from a field
    if (e.key === 'Enter') this.setNullEditing()
    // When we press Esc we don't want to save a result and want to remove focus from a field
    else if (e.keyCode === 27 /* ESC */) {
      const propName = this.state.editingField + 'Value'
      const newState = {}
      newState[propName] = this.prevTextFieldValue
      this.setState(newState)
      this.setNullEditing()
    }
  }

  onFieldChanged(newValue) {
    if (!this.state.editingField) return
    const propName = this.state.editingField + 'Value'
    const newState = {}
    newState[propName] = newValue
    this.setState(newState)
  }

  onMonthlyClick() {
    if (this.state.editingField !== 'monthly') {
      this.prevTextFieldValue = this.state.monthlyValue
      this.setState({ editingField: 'monthly' })
    }
  }

  setNullEditing() {
    this.setState({ editingField: null })
  }

  componentDidUpdate() {
    if (this.tfMonthly) this.tfMonthly.focus()
  }

  render() {
    const {
      leftIconCallback,
      rightIconCallback,
    } = this.props;

    const isMonthlyEditing = this.state.editingField === 'monthly'

    return (
      <React.Fragment>
        <Toolbar
          colored
          className="AppBarInner"
          nav={<Button icon onClick={leftIconCallback}>menu</Button>}
          actions={<Button icon onClick={rightIconCallback}>sync</Button>}
        >
          <Toolbar className="centered">
            <Button
              flat
              primary
              className="contributions"
              onClick={this.onMonthlyClick}
            >
                Monthly Contribution:&nbsp;
                <span className={ (isMonthlyEditing ? 'hidden' : '') }>{this.state.monthlyValue}</span>
                <TextField
                  ref={val => this.tfMonthly = val}
                  id="monthly-contribution-field"
                  placeholder="Amount"
                  fullWidth={false}
                  className={ "textfield-monthly-contribution " + (isMonthlyEditing ? '' : 'hidden') }
                  resize={{min:0,max:400}}
                  onBlur={this.setNullEditing}
                  onChange={this.onFieldChanged}
                  value={this.state.monthlyValue} />
            </Button>
            <Button flat primary className="lumpsum" >Lump Sums: $0</Button>
          </Toolbar>
        </Toolbar>
        <MenuDrawer
          id='contributions-menu'
          position='left'
        />
      </React.Fragment>
    );
  }
}

MenuBar.propTypes = {
  leftIconCallback: PropTypes.func,
  rightIconCallback: PropTypes.func,
};
