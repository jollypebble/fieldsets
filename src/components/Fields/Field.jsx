import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

/**
 * Fields are data points with corresponding values, labels, parent ids & callback functions
 */
 function Field() {
   constructor(props) {
     super(props);
     this.state = {
       value: false,
       related: []
     };
   }


   render() {
     const {
       id,
       type,
       name
     } = this.props;

     switch(type) {
       case 'currency':

        break;
      case 'status':

        break;
      default:

     }

   }
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.node
};

export default Field;
