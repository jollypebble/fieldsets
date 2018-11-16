/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  offenceAllocationAddExtraField,
  offenceAllocationRemoveExtraField
} from 'redux-base/actions';
import { CircleModal, Button } from 'components';

const mapStateToProps = (state, ownProps) => ({
  offense_allocation: state.treeDiagram.offense_allocation.children[ownProps.nodeData.id]
});

const mapDispatchToProps = {
  offenceAllocationAddExtraField,
  offenceAllocationRemoveExtraField
};

class NodeLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      // nodeId: props.nodeData.attributes.id
      nodeId: props.nodeData.id,
      width: props.parentWidth,
      height: props.parentHeight,
    };
  }

  getDataToDisplay = (data) => {
    let displayable = [];
    data.forEach((item) => {
      if (item.displayInCircle) {
        displayable = [...displayable, item];
      }
    });
    return displayable;
  }

  getInitialValues = (circleData) => {
    const initialValues = {};
    circleData.forEach((data) => {
      if (!data.hasExtraFields) {
        initialValues[data.key] = data.value;
      }
    });
    return initialValues;
  }

  handleToggleModal = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  handleAddExtraField = (value) => {
    const newField = {
      key: value.replace(' ', ''),
      value: '',
      label: value
    };
    this.props.offenceAllocationAddExtraField(newField, this.state.nodeId);
  }

  handleRemoveExtraField = (key) => {
    this.props.offenceAllocationRemoveExtraField(key, this.state.nodeId);
  }

  handleCollapse = () => {
    this.props.handleCollapse();
  }

  handleSave = (data) => {
    console.log('Save', data);
  }

  render() {
    const {
      modalVisible,
      nodeId,
      width,
      height
    } = this.state;
    const {
      nodeData
    } = this.props;
    const circleData = nodeData.fields;
    const dataToDisplay = this.getDataToDisplay(circleData);
    const initialValues = this.getInitialValues(circleData);
    return (
      <foreignObject width={ width } height={ height }>
        <div className="nodeWrapper" onClick={ this.handleCollapse }>
          <CircleModal
            title={ nodeData.name }
            nodeId={ nodeId }
            visible={ modalVisible }
            handleToggle={ this.handleToggleModal }
            handleSave={ this.handleSave }
            handleAddExtraField={ this.handleAddExtraField }
            handleRemoveExtraField={ this.handleRemoveExtraField }
            circleData={ circleData }
            initialValues={ initialValues }
            form={ `circleModalForm${nodeId}` }
          />
          <Button onClick={ this.handleToggleModal }>{ nodeData.name }</Button><br />
          {dataToDisplay.map(item => (
            <b key={ item.key }>{item.label} {item.key !== 'dollar' ? '$' : ''}{item.value}<br /></b>
          ))}
        </div>
      </foreignObject>
    );
  }
}

NodeLabel.propTypes = {
  nodeData: PropTypes.object.isRequired,
  offenceAllocationAddExtraField: PropTypes.func,
  offenceAllocationRemoveExtraField: PropTypes.func,
  handleCollapse: PropTypes.func,
  offense_allocation: PropTypes.object,
  parentHeight: PropTypes.number,
  parentWidth: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeLabel);
