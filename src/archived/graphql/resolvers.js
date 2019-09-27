import { resolvers } from 'graphql-scalars';
import { fetchMeta, fetchFocus, fetchFieldSet, fetchFieldSets } from './queries';

const resolverMap = {
  ...resolvers,
  Mutation: {
    updateFocus: ( object, variables, { cache, getCacheKey } ) => {
      const id = getCacheKey({__typename: 'Set', id: variables.id});
      const focus = cache.readFragment({ id, fragment: fetchMeta, fragmentName: 'meta' });

      cache.writeData({
        query: fetchFocus,
        data: {focus}
      });
      return focus;
    },
    updateField: ( object, { data }, { cache, getCacheKey } ) => {
      const id = getCacheKey({ __typename: 'Field', id: data.id });
      const fieldData = cache.readFragment({ id, fragment: fetchFieldSet, fragmentName: 'field' });
      const updatedFieldData = {
        ...fieldData,
        value: data.value
      };
      cache.writeFragment({
        id,
        fragment: fetchFieldSet,
        fragmentName: 'field',
        data: updatedFieldData
      });

      return updatedFieldData;
    },
    updateFieldSet: ( object, { data }, { cache, getCacheKey } ) => {
      let result = [];
      data.forEach(item => {
        const id = getCacheKey({ __typename: 'Field', id: item.id });
        const fieldData = cache.readFragment({ id, fragment: fetchFieldSet, fragmentName: 'field' });
        cache.writeFragment({
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
    }
  },
  Query: {
    something: (object, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({__typename: 'FieldSet', id: variables.id});
      const set = cache.readFragment({ id, fragment: fetchFieldSets, fragmentName: 'fieldset' });
      return set.children;
    }
  }
};
export { resolverMap as resolvers };
