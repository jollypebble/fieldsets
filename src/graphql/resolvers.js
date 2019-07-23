import { getSetList, getCurrentFocus, getFieldList } from './queries';

export const resolvers = {
  Mutation: {
    updateCurrentFocus: ( object, variables, { cache, getCacheKey } ) => {
      const id = getCacheKey({__typename: 'Set', id: variables.id});
      const currentFocus = cache.readFragment({ id, fragment: getSetList, fragmentName: 'set' });

      cache.writeData({
        query: getCurrentFocus,
        data: {currentFocus}
      });
      return currentFocus;
    },
    updateField: ( object, { data }, { cache, getCacheKey } ) => {
      const id = getCacheKey({ __typename: 'Field', id: data.id });
      const fieldData = cache.readFragment({ id, fragment: getFieldList, fragmentName: 'field' });
      const updatedFieldData = {
        ...fieldData,
        value: data.value
      };
      cache.writeFragment({
        id,
        fragment: getFieldList,
        fragmentName: 'field',
        data: updatedFieldData
      });

      return updatedFieldData;
    },
    updateFieldList: ( object, { data }, { cache, getCacheKey } ) => {
      let result = [];
      data.forEach(item => {
        const id = getCacheKey({ __typename: 'Field', id: item.id });
        const fieldData = cache.readFragment({ id, fragment: getFieldList, fragmentName: 'field' });
        cache.writeFragment({
          id,
          fragment: getFieldList,
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
    getSetFields: (object, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({__typename: 'FieldList', id: variables.id});
      const fields = cache.readFragment({ id, fragment: getFieldList, fragmentName: 'fields' });
      return fields.list;
    },
    getSet: (object, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({__typename: 'Set', id: variables.id});
      const set = cache.readFragment({ id, fragment: getSetList, fragmentName: 'set' });
      return set;
    }
  },
};
