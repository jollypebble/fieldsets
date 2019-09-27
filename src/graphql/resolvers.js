import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { fetchMeta, fetchFocus, fetchField, fetchFieldSet } from './queries';
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
      // After we set our focus, we need to load the fragment data into our root query fieldsets so we can use use them within the focused container.

      return;
    },
    updateFieldSets: ( object, { data }, { cache, client, getCacheKey } ) => {
      const containerID = data.containerID;
      const containerType = data.type;
      const container = cache.readFragment({
        id: getCacheKey({ __typename: 'FieldSet', id: containerID }),
        fragment: fetchFieldSet,
        fragmentName: 'fieldset'
      });

      let fieldsets = [];
      container.children.map((fieldsetID) => {
        const fieldset = cache.readFragment({
          id: getCacheKey({ __typename: 'FieldSet', id: fieldsetID }),
          fragment: fetchFieldSet,
          fragmentName: 'fieldset'
        });
        fieldset.meta.data.__typename = 'JSONObject';
        fieldsets.push(fieldset);
      });

      let fields = [];
      container.fields.map((fieldID) => {
        const field = cache.readFragment({
          id: getCacheKey({ __typename: 'Field', id: fieldID }),
          fragment: fetchField,
          fragmentName: 'field'
        });
        field.meta.data.__typename = 'JSONObject';
        fields.push(field);
      });

      client.writeData({ data: { fields: fields } });
      client.writeData({ data: { fieldsets: fieldsets } });

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
      console.log('fetching');
      console.log(data);
      console.log( object );
      return;
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
