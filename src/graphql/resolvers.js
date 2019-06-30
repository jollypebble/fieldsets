import { getNodeList, getCurrentFocus, getFieldList } from './components/Diagrams';

export const resolvers = {
  Mutation: {
    setCurrentFocus: ( object, variables, { cache, getCacheKey } ) => {
      const id = getCacheKey({__typename: 'Node', id: variables.id});
      const currentFocus = cache.readFragment({ id, fragment: getNodeList, fragmentName: 'node' });

      cache.writeData({
        query: getCurrentFocus,
        data: {currentFocus}
      });
      return currentFocus;
    },
    updateField: ( object, { data }, { cache, getCacheKey } ) => {
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
    getNodeFields: (object, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({__typename: 'FieldList', id: variables.id});
      const fields = cache.readFragment({ id, fragment: getFieldList, fragmentName: 'fields' });
      return fields.list;
    },
    getNode: (object, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({__typename: 'Node', id: variables.id});
      const node = cache.readFragment({ id, fragment: getNodeList, fragmentName: 'node' });
      return node;
    }
  },
};
