// Think of these as DB table definitions with defaults..
export const defaults = {
  currentFocus: {
    id: 'default',
    name: '',
    centerX: 0,
    centerY: 0,
    fields: [],
    __typename: 'Circle'
  },
  owners: [{
    id: 'default',
    name: '',
    firstname: '',
    lastname: '',
    dob: '',
    __typename: 'Owner'
  }],
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
    fields: [],
    __typename: 'Circle'
  }]
};
