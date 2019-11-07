// The default place holders. These might not be needed after we do a cache prime and can most likely be removed from index.js.
export const defaults = {
  accounts: {
    id: 'accounts',
    name: 'Account Members',
    type: 'accounts',
    parent: '',
    children: [
      {
        subset: {
          id: 'default',
          name: '',
          parent: 'default',
          children: [],
          meta: [],
          __typename: 'Member'
        },
        __typename: 'SubSet'
      }
    ],
    meta: [
      {
        meta: {
          id: 'roles',
          value: [],
          __typename: 'Roles'
        },
        __typename: 'Meta'
      }
    ],
    __typename: 'Accounts'
  },
  containers: {
    id: 'containers',
    name: 'Application Containers',
    type: 'containers',
    parent: '',
    children: [
      {
        subset: {
          id: 'diagrams',
          name: 'Application Diagrams',
          type: 'containers',
          parent: 'containers',
          children: [],
          meta: [
            {
              meta: {
                id: 'focus',
                value: null,
                coordinate: {
                  x: 0,
                  y: 0,
                  __typename: 'Coordinate'
                },
                depth: 0,
                __typename: 'Focus'
              },
              __typename: 'Meta'
            }
          ],
          __typename: 'Diagrams'
        },
        __typename: 'SubSet'
      },
      {
        subset: {
          id: 'interfaces',
          name: 'Application Interfaces',
          type: 'containers',
          parent: 'containers',
          children: [],
          meta: [],
          __typename: 'Interfaces'
        },
        __typename: 'SubSet'
      }
    ],
    meta: [],
    __typename: 'Containers'
  },
  fieldsets: {
    id: 'fieldsets',
    name: 'FieldSets',
    type: 'fieldsets',
    parent: '',
    children: [
      {
        subset: {
          id: 'default',
          name: 'Default FieldSet',
          parent: '',
          children: [],
          fields: [],
          meta: [],
          __typename: 'FieldSet'
        },
        __typename: 'SubSet'
      }
    ],
    __typename: 'FieldSets'
  }
};
