import { getNodeData, getCurrentFocus } from './components/Diagrams';

export const resolvers = {
  Mutation: {
    setCurrentFocus: (object, variables, { cache, getCacheKey }) => {

      const id = getCacheKey({ __typename: 'Circle', id: variables.id });
      console.log(id);

      const currentFocus = cache.readFragment({ id, fragment: getNodeData });
      console.log(currentFocus);

      cache.writeData({
        query: getCurrentFocus,
        data: { currentFocus },
        options: { refetchQueries: [ 'getCurrentFocus' ] }
      });

      return currentFocus;
    },
  },
};

export default resolvers;
