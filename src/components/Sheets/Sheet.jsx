import React from 'react';
import PropTypes from 'prop-types';
import SheetType from './SheetType';

export default class Sheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sheet: null,
      name: '',
      data: {},
      options: {}
    };
  }

  /**
   * Component will Mount is used as a one time initialization.
   * Initialize the last saved local state.
   */
  componentWillMount() {
    this.resetState()
  }

  resetState() {
    const {
      sheet,
      name,
      data,
      options,
      onChange,
      onSave
    } = this.props;

    // Reset our state
    const state = {
      sheet: sheet,
      name: name,
      data: data
    }
    this.setState(state);
  }

  /** Refetch values calculated on this field. */
  updateDependencies() {

  }

  render() {
    return (
      <SheetType
        sheet={this.props.sheet}
        data={this.state.value}
        onChange={this.props.onChange}
        onSave={this.props.onSave}
        options={{
          ...this.props.options
        }}
      />
    );
  }
}

Sheet.propTypes = {
  sheet: PropTypes.string.isRequired,
  data: PropTypes.array,
  onChange: PropTypes.func,
  onSave: PropTypes.func
};
