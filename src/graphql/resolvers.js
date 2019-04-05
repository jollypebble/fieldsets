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
  Query: {
    getNodeFields: ( object, variables, { cache, getCacheKey } ) => {
      console.log( 'HOWDY');
      //const nodeID = getCacheKey({__typename: 'Circle', id: variables.id});
      //const node = cache.readFragment({ id: id, fragment: getNodeData });

      //const fields = cache.readQuery({ id: id, fragment: getNodeData });
      /**
        cache.writeFragment({
          query: getCurrentFocus,
          data: {currentFocus}
        });
      **/
      //return fields;
    },
  },
};
