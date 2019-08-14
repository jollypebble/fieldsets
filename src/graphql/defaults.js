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
      setview: '',
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
        description: '',
        parent: '',
        value: '',
        alwaysDisplay: false,
        type: 'currency',
        callback: '',
        notes:[],
        accounts:[],
        order: 0,
        __typename: 'Field'
      }],
      __typename: 'FieldList'
    },
    __typename: 'Set'
  },
  fields: {
    id: 'default',
    list: [{
      id: 'default',
      name: '',
      description: '',
      parent: '',
      value: '',
      alwaysDisplay: false,
      type: 'currency',
      callback: '',
      notes:[],
      accounts:[],
      order: 0,
      __typename: 'Field'
    }],
    __typename: 'FieldList'
  },
  clients: {
    id: 'default',
    list: [{
      id: 'default',
      accountName: '',
      clientName1: '',
      clientName2: '',
      cpaName: '',
      attyName: '',
      ipAddress: '',
      __typename: 'Client'
    }],
    __typename: 'ClientList'
  },
  sets: {
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
        setview: '',
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
      __typename: 'Set'
    }],
    __typename: 'SetList'
  }
};
