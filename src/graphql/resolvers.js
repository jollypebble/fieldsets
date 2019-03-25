import { getNodeData, getCurrentFocus } from './components/Diagrams';

export const resolvers = {
  Mutation: {
    setCurrentFocus: ( object, variables, { cache, getCacheKey } ) => {
      const id = getCacheKey({__typename: 'Circle', id: variables.id});
      const currentFocus = cache.readFragment({ id: id, fragment: getNodeData });

      cache.writeData({
        query: getCurrentFocus,
        data: {currentFocus}
      });
      return currentFocus;
    },
  },
};
