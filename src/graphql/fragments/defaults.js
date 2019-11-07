/**
 * This file contains the default data shape and values for our graphql query fragments. We can use these when we initialize fragments that have not been created.
 */
export const fragmentDefaults = {
  account: {
    name: '',
    type: 'account',
    parent: '',
    children: [],
    members: [],
    meta: {
      type: 'account',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'Account'
  },
  field: {
    name: '',
    description: '',
    parent: [],
    fieldsets: [],
    value: null,
    type: 'default',
    callback: false,
    owner: '',
    order: 0,
    children: [],
    meta: {
      type: 'field',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'Field'
  },
  fieldset: {
    name: '',
    type: 'fieldset',
    parent: '',
    children: [],
    fields: [],
    meta: {
      type: 'fieldset',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'FieldSet'
  },
  diagram: {
    name: '',
    type: 'diagram',
    parent: 'container',
    children: [],
    fields: [],
    meta: {
      type: 'diagram',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'FieldSet'
  },
  member: {
    name: '',
    parent: '',
    children: [],
    roles: [],
    meta: {
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
      attributes: {
        __typename: 'JSONObject'
      },
      options: [],
      filters: [],
      className: 'fieldset interface',
      __typename: 'JSONObject'
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
      options: [],
      filters: [],
      className: 'fieldset diagram',
      __typename: 'JSONObject'
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
      options: [],
      zoom: {
        scale: 3.75,
        __typename: 'JSONObject'
      },
      filters: [],
      className: 'fieldset',
      __typename: 'JSONObject'
    },
    field: {
      notes: [],
      attributes: {
        __typename: 'JSONObject'
      },
      options: [],
      filters: [],
      alwaysDisplay: false,
      className: 'field',
      __typename: 'JSONObject'
    },
    account: {
      notes: [],
      attributes: {
        __typename: 'JSONObject'
      },
      options: [],
      filters: [],
      className: 'account',
      __typename: 'JSONObject'
    },
    member: {
      notes: [],
      attributes: {
        __typename: 'JSONObject'
      },
      options: [],
      filters: [],
      className: 'member',
      __typename: 'JSONObject'
    },
    role: {
      notes: [],
      attributes: {
        __typename: 'JSONObject'
      },
      options: [],
      filters: [],
      className: 'role',
      __typename: 'JSONObject'
    }
  },
  role: {
    name: '',
    type: 'role',
    parent: '',
    children: [],
    meta: {
      type: 'role',
      data: { __typename: 'JSONObject' },
      __typename: 'Meta'
    },
    __typename: 'Role'
  }
};
