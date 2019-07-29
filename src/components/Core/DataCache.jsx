import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

class DataCache extends Component = {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      sets: {},
      account: {},
      fieldLists: {},
      setLists: {}
    }
  }
  /**
   * Get Field List by id
   */
  const getField = (id) => {

  }

  /**
   * Get Field List by parent id
   */
   const getFieldList = (parent) => {

   }

   /**
    * Get Set by id
    */
   const getSet = (id) => {

   }
   
   /**
    * Get Set List by parent id
    */
   const getSetList = (parent) => {

   }
}

export default DataCache;
