// The default place holders. These might not be needed after we do a cache prime and can most likely be removed from index.js.
export const defaults = {
  currentFocus: {
    id: 'default',
    name: '',
    centerX: 0,
    centerY: 0,
    parent: '',
    depth: 0,
    display: {
      id: 'default',
      shape: '',
      attributes: [],
      visible: false,
      className: '',
      zoom: {
        id: 'default',
        x: 0,
        y: 0,
        scale: 1,
        __typename: 'ZoomData'
      },
      __typename: 'DisplayData'
    },
    fields: {
      id: 'default',
      list: [{
        id: 'default',
        name: '',
        parent: '',
        value: '',
        alwaysDisplay: false,
        datatype: 'currency',
        callback: '',
        notes:[],
        owners:[],
        order: 0,
        __typename: 'Field'
      }],
      __typename: 'FieldList'
    },
    __typename: 'Node'
  },
  fields: {
    id: 'default',
    list: [{
      id: 'default',
      name: '',
      parent: '',
      value: '',
      alwaysDisplay: false,
      datatype: 'currency',
      callback: '',
      notes:[],
      owners:[],
      order: 0,
      __typename: 'Field'
    }],
    __typename: 'FieldList'
  },
  nodes: {
    id: 'default',
    list: [{
      id: 'default',
      name: '',
      parent: '',
      centerX: 0,
      centerY: 0,
      depth: 0,
      display: {
        id: 'default',
        shape: '',
        attributes: [],
        visible: false,
        className: '',
        zoom: {
          id: 'default',
          x: 0,
          y: 0,
          scale: 1,
          __typename: 'ZoomData'
        },
        __typename: 'DisplayData'
      },
      __typename: 'Node'
    }],
    __typename: 'NodeList'
  }
};
