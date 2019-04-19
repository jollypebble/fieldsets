import { getNodeList, getCurrentFocus } from './components/Diagrams';

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
  },
};
