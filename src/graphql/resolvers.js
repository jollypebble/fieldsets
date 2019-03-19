import { getNodeData, getCurrentFocus } from './components/Diagrams';

export const resolvers = {
  Mutation: {
    setCurrentFocus: ( object, variables, { cache, getCacheKey } ) => {
      console.log('Focus Circle');

      const id = getCacheKey({__typename: 'Circle', id: variables.id});
      console.log(id);

      const currentFocus = cache.readFragment({ id: id, fragment: getNodeData });
      console.log(currentFocus);

      cache.writeData({
        query: getCurrentFocus,
        data: {currentFocus}
      });

      console.log('Focus Cache Updated');
      return currentFocus;
    },
  },
};
