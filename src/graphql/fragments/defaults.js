/**
 * This file contains the default data shape for our fragments. We can use these when we initialize fragments that have not been created.
 */
export const fragmentDefaults = {
  account:{
    id: 'default',
    name: '',
    type: 'account',
    parent: '',
    children: [],
    members: [],
    meta: {
      id: 'default',
      type: 'account',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'Account'
  },
  field: {
    id: 'default',
    name: '',
    description: '',
    parent: '',
    sets: [],
    value: null,
    type: 'default',
    callback: false,
    owner: '',
    order: 0,
    dependencies: [],
    meta: {
      id: 'default',
      type: 'field',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'Field'
  },
  fieldset: {
    id: 'default',
    name: '',
    type: 'fieldset',
    parent: '',
    children: [],
    fields: [],
    meta: {
      id: 'default',
      type: 'fieldset',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'FieldSet'
  },
  diagram: {
    id: 'default',
    name: '',
    type: 'diagram',
    parent: 'container',
    children: [],
    fields: [],
    meta: {
      id: 'default',
      type: 'diagram',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'FieldSet'
  },
  member: {
    id: 'default',
    name: '',
    parent: '',
    children: [],
    roles: [],
    meta: {
      id: 'default',
      type: 'member',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'Member'
  },
  meta: {
    interface: {
      focus: null,
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      className: '',
    },
    diagram: {
      setview: '',
      focus: null,
      notes: [],
      attributes: {
        __typename: 'JSONObject'
      },
      zoom: {
        scale: 1,
        __typename: 'JSONObject'
      },
      center: { __typename: 'JSONObject' },
      options: null,
      filters: null,
      className: ''
    },
    fieldset: {
      notes: [],
      center: { __typename: 'JSONObject' },
      visible: true,
      depth: 0,
      setview: 'Circle',
      attributes: {
        __typename: 'JSONObject'
      },
      className: '',
      options: null,
      zoom: {
        scale: 1,
        __typename: 'JSONObject'
      },
      filters: null
    },
    field: {
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      alwaysDisplay: false,
      className: ''
    },
    account: {
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      className: ''
    },
    member: {
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      className: ''
    },
    role: {
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      permissions: null,
      className: ''
    }
  },
  role: {
    id: 'default',
    name: '',
    type: 'role',
    parent: '',
    children: [],
    meta: {
      id: 'default',
      type: 'role',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'Role'
  }
};