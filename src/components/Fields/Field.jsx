import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation, withApollo } from 'react-apollo';
import FieldType from './FieldType';
import { updateField } from '../../graphql';

/**
 * A field is a single data value in a set.
 */

class Field extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      notes:[],
      account:null,
      member:null
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
      value,
      notes,
      account,
      member
    } = this.props;

    // @TODO: Insert a remote save before reset.
    // this.props.client.writeData({ data: {  } });

    // Reset our state
    const state = {
      value: value,
      notes: notes,
      account: account,
      member: member
    }
    this.setState(state);
  }

  /** Refetch values calculated on this field. */
  updateFieldDependencies() {

  }

  render() {
    const id = this.props.id;
    const value = this.state.value;
    // Child Set
    return (
      <Mutation mutation={updateField} variables={{ data: {id,value} }} awaitRefetchQueries={true}>
        {updateData => (
          <FieldType
            id={id}
            account={this.props.account}
            member={this.props.member}
            name={this.props.name}
            fieldtype={this.props.fieldtype}
            value={value}
            options={{
              ...this.props.options
            }}
            onChange={updateData}
          />
        )}
      </Mutation>
    );
  }
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withApollo(Field);
