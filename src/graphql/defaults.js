// The default place holders. These might not be needed after we do a cache prime and can most likely be removed from index.js.
export const defaults = {
  currentFocus: {
    id: 'default',
    name: '',
    centerX: 0,
    centerY: 0,
    depth: 0,
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
    zoom: {
        x: 0.5,
        y: 0.5,
        scale: 1,
        __typename: 'ZoomScale'
    },
    __typename: 'Circle'
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
      centerX: 0,
      centerY: 0,
      depth: 0,
      zoom: {
          x: 0.5,
          y: 0.5,
          scale: 1,
          __typename: 'ZoomScale'
      },
      __typename: 'Circle'
    }],
    __typename: 'NodeList'
  }
};
