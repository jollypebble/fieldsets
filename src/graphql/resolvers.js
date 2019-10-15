import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { fetchMeta, fetchFocus, fetchField, fetchFieldSet, fetchContainer } from './queries';
import { defaults } from './defaults';

export const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Mutation: {
    updateFocus: ( object, { data }, { client, getCacheKey } ) => {
      const newfocus = {
        ...defaults.focus,
        ...data,
        container: {
          ...defaults.focus.container,
          ...data.container
        },
        center: {
          ...defaults.focus.center,
          ...data.center
        },
        zoom: {
          ...defaults.focus.zoom,
          ...data.zoom
        }
      };
      client.writeQuery({query: fetchFocus, data: {focus: newfocus}});
      return newfocus;
    },
    updateContainer: ( object, { data }, { client, getCacheKey } ) => {
      // Don't use defaults for updates.
      const containerID = data.containerID;
      const container = client.readFragment({
        id: getCacheKey({ __typename: 'FieldSet', id: containerID }),
        fragment: fetchFieldSet,
        fragmentName: 'fieldset'
      });
      client.writeQuery({query: fetchContainer, data: {container: container}});
      const refetch = client.readQuery({query: fetchContainer});
      return refetch.container;
    },
    updateFieldSets: ( object, { data }, { client, getCacheKey } ) => {
      return;
    },
    updateField: ( object, { data }, { client, getCacheKey } ) => {
      const id = getCacheKey({ __typename: 'Field', id: data.id });
      const fieldData = client.readFragment({ id, fragment: fetchFieldSet, fragmentName: 'field' });
      const updatedFieldData = {
        ...fieldData,
        value: data.value
      };
      client.writeFragment({
        id,
        fragment: fetchFieldSet,
        fragmentName: 'field',
        data: updatedFieldData
      });

      return updatedFieldData;
    },
    updateFieldSet: ( object, { data }, { client, getCacheKey } ) => {
      let result = [];
      data.forEach(item => {
        const id = getCacheKey({ __typename: 'Field', id: item.id });
        const fieldData = client.readFragment({ id, fragment: fetchFieldSet, fragmentName: 'field' });
        client.writeFragment({
          id,
          fragment: fetchFieldSet,
          fragmentName: 'field',
          data: {
            ...fieldData,
            value: item.value
          }
        });
        result.push(fieldData.parent);
      });

      return result;
    },
    updateMeta: ( object, { data }, { client, getCacheKey } ) => {
      return;
    },
    updateMember: ( object, { data }, { client, getCacheKey } ) => {
      return;
    },
    updateAccount: ( object, { data }, { client, getCacheKey } ) => {
      return;
    },
    updateRole: ( object, { data }, { client, getCacheKey } ) => {
      return;
    }
  },
  Query: {
    fetchFieldSets: ( object, { data }, { client, getCacheKey } ) => {
      const container = client.readQuery({query: fetchContainer});
      let fieldsets = [];
      container.container.children.map(
        (fieldsetID) => {
          const fieldset = client.readFragment({
            id: getCacheKey({ __typename: 'FieldSet', id: fieldsetID }),
            fragment: fetchFieldSet,
            fragmentName: 'fieldset'
          });
          fieldsets.push(fieldset);
        }
      );
      // We allow for specific filters here.
      if ( data ) {
        if (data.hasOwnProperty('parent')) {
          const parents = fieldsets.filter( ( fieldset ) => {
            return fieldset.parent === data.parent;
          });
          return parents;
        }
      }
      return fieldsets;
    },
    fetchFields: ( object, { data }, { client, getCacheKey } ) => {
    },
    fetchAccounts: ( object, { data }, { client, getCacheKey } ) => {
    },
    fetchAccount: ( object, { data }, { client, getCacheKey } ) => {
    },
    fetchMembers: ( object, { data }, { client, getCacheKey } ) => {
    },
    fetchRoles: ( object, { data }, { cache, getCacheKey } ) => {
    }
  },
  Set: {
    __resolveType(obj, context, info) {
      switch( obj.type) {
        case 'account':
          return 'Account';
        case 'member':
          return 'Member'
        case 'role':
          return 'Role'
        case 'set':
          return 'Set'
        case 'field':
          return 'Field'
        default:
          return 'FieldSet'
      }
    }
  },
  Coordinate: {
    __resolveType(obj, context, info) {
      if (obj.scale) {
        return 'Zoom'
      }
      return 'Center';
    }
  },
};
