import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, withApollo } from 'react-apollo';
import FieldType from './FieldType';
import { updateField } from '../../graphql';

/**
 * A field is a single data value in a node.
 */


class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      notes:[],
      owners:[]
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
      owners
    } = this.props;

    // @TODO: Insert a remote save before reset.
    // this.props.client.writeData({ data: {  } });

    // Reset our state
    const state = {
      value: value,
      notes: notes,
      owners: owners
    }
    this.setState(state);
  }

  /** Refetch values calculated on this field. */
  updateDependencies() {

  }

  render() {
    const id = this.props.id;
    // Child Node
    return (
      <Mutation mutation={updateField} variables={{ id }} onCompleted={this.updateDependencies} awaitRefetchQueries={true}>
        {field => {
          return (
              <FieldType
                id={id}
                name={this.props.name}
                fieldtype={this.props.fieldtype}
                value={this.state.value}
                options={{
                  ...this.props.options
                }}
                onChange={field}
              />
          );
        }}
      </Mutation>
    );
    }
  }

Field.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withApollo(Field);
