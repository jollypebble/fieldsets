import React, { Component } from 'react';
import { withApollo } from "react-apollo";

import { DiagramData, FieldData } from '../../config';

import { getFields, getCurrentFocus, getNodes, defaults } from '../../graphql';

/**
 * This top level object for a diagram. All data priming and loading is handled in with this and other classes can extend it.
 */
class Diagram extends Component {
  constructor(props) {
    super(props);

    // Component State
    this.state = {
      nodes: {},
      sheets: {},
      fields: {},
    };

    // Component Specific Methods
    this.primeCache = this.primeCache.bind(this);
    this.setFieldCache = this.setFieldCache.bind(this);
    this.setDataCache = this.setDataCache.bind(this);
    this.setNodeState = this.setNodeState.bind(this);
    this.getNodes = this.getNodes.bind(this);
    this.setFieldState = this.setFieldState.bind(this);
    this.getFields = this.getFields.bind(this);
  }

  /**
   * Component will Mount is used as a one time initialization.
   * We use this to prime our cache for this component.
   */
  componentWillMount() {
    // This primes our cache.
    this.primeCache();
  }

  /**
   * Here we add all of our component specific event listeners and interact with our component.
   */
  componentDidMount() {
    this.resetFocus();
  }

  getFields = (variables) => {
    return this.props.client.readQuery({ query: getFields });
  }

  getNodes = (variables) => {
    // console.log('Getting cached Nodes');
    return this.props.client.readQuery({ query: getNodes, variables: variables });
  }

  setNodeState = (nodes) => {
    // console.log('Setting Node state.');
    // Do something to update a node state.
    this.setState({nodes: nodes});
  }

  setFieldState = (fields) => {
    // console.log('Setting Field state.');
    // Do something to update a node state.
    this.setState({fields: fields});
  }

  primeCache = () => {
    // console.log('Priming');
    // @TODO: REMOTE GRAPHQL CALLS GO HERE. FOR NOW WE PULL IN CONFIG BASED DATA.
    this.setFieldCache(FieldData);
    this.setDataCache(DiagramData);
  }

  setFieldCache = (data=[]) => {
    // console.log('Updating Field cache');
    let previous = this.getFields({});
    if (! data.length) {
      return false;
    }

    // Get your fields here. This is defined as a static json, but could be modified here to get remote field type definitions.
    data.map(currentField => {
      // console.log('Current field:', currentField);
      currentField.__typename = 'Field';
      previous.fields.push(currentField);
      return true;
    });
    const fields = previous.fields;
    this.props.client.writeData({
      data: {fields}
    });

    // console.log('Field cache updated');
    this.setFieldState(fields);

    return true;
  }

  setDataCache = (data=[]) => {
    // console.log('Caching nodes: ');

    let previous = this.getNodes({});
    let nodes = previous.nodes;

    if (! data.length) {
      return false;
    }

    data.map(node => {
      // console.log('Node:', node);
      const children = typeof(node.children) === undefined ? [] : node.children;
      if (children.length) {
        // console.log('Caching child nodes....');
        this.setDataCache(children);
      }

      const previous = this.getFields({parent: node.id});
      // console.log('Previous fields:', previous.fields);
      const fields = previous.fields.map(field => {
        field.__typename = 'Field';
        return field;
      });

      node.__typename = 'Node';
      nodes.push(node);
      this.props.client.writeData({
        data: {nodes, fields}
      });
      return true;
    });
    // console.log('Cache Updated');
    this.setNodeState(nodes);

    return true;
  }

  render() {
    return;
  }
}
export default withApollo(Diagram);
