// Think of these as DB table definitions with defaults..
export const defaults = {
  currentFocus: {
    id: 'default',
    name: '',
    centerX: 0,
    centerY: 0,
    depth: 0,
    fields: [],
    zoom: {
        x: 0.5,
        y: 0.5,
        scale: 1,
        __typename: 'ZoomScale'
    },
    __typename: 'Circle'
  },
  fields: [{
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
  nodes: [{
    id: 'default',
    name: '',
    centerX: 0,
    centerY: 0,
    depth: 0,
    fields: [],
    zoom: {
        x: 0.5,
        y: 0.5,
        scale: 1,
        __typename: 'ZoomScale'
    },
    __typename: 'Circle'
  }]
};
