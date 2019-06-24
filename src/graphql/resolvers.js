import { getNodeList, getCurrentFocus, getFieldList, getFields, updateField } from './components/Diagrams';

export const resolvers = {
  Mutation: {
    setCurrentFocus: ( object, variables, { cache, getCacheKey } ) => {
      const id = getCacheKey({__typename: 'Node', id: variables.id});
      const currentFocus = cache.readFragment({ id: id, fragment: getNodeList, fragmentName: 'node' });

      cache.writeData({
        query: getCurrentFocus,
        data: {currentFocus}
      });
      return currentFocus;
    },
    updateField: ( object, variables, { cache, getCacheKey } ) => {
      const id = getCacheKey({__typename: 'Field', id: variables.id});
      const updatedField = cache.readFragment({ id: id, fragment: getFieldList, fragmentName: 'field' });

      return updatedField;
    },
  },
  Query: {
    getNodeFields: (object, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({__typename: 'FieldList', id: variables.id});
      const fields = cache.readFragment({ id: id, fragment: getFieldList, fragmentName: 'fields' });
      return fields.list;
    },
  },
};
