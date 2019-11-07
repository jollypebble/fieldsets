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
    fieldsets: [],
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
      className: 'fieldset interface',
    },
    diagram: {
      view: '',
      focus: null,
      notes: [],
      attributes: {
        __typename: 'JSONObject'
      },
      zoom: {
        scale: 2.3,
        __typename: 'JSONObject'
      },
      center: { __typename: 'JSONObject' },
      options: null,
      filters: null,
      className: 'fieldset diagram'
    },
    fieldset: {
      notes: [],
      center: { __typename: 'JSONObject' },
      visible: true,
      depth: 0,
      view: 'Circle',
      attributes: {
        __typename: 'JSONObject'
      },
      options: null,
      zoom: {
        scale: 3.75,
        __typename: 'JSONObject'
      },
      filters: null,
      className: 'fieldset'
    },
    field: {
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      alwaysDisplay: false,
      className: 'field'
    },
    account: {
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      className: 'account'
    },
    member: {
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      className: 'member'
    },
    role: {
      notes: [],
      attributes: null,
      options: null,
      filters: null,
      permissions: null,
      className: 'role'
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
